"use strict";
/**
 * Security validators ported from the Rust admin Lambda.
 *
 * These catch SSRF attempts and SSM path-traversal attacks client-side,
 * providing fast feedback without a server round-trip.  The admin Lambda
 * performs the same checks server-side as defense-in-depth.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToolEndpoint = validateToolEndpoint;
exports.validateToolSsmPath = validateToolSsmPath;
exports.validateAgentTools = validateAgentTools;
const constants_1 = require("./constants");
// ── Endpoint (SSRF) validation ──────────────────────────────────────── //
/**
 * Returns true if `host` looks like an IPv4 address (four dot-separated
 * decimal octets, optionally wrapped in brackets).
 */
function looksLikeIpv4(host) {
    return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}
/**
 * Returns true when `ip` falls in a private/non-routable IPv4 range.
 */
function isPrivateIpv4(ip) {
    for (const prefix of constants_1.PRIVATE_IPV4_PREFIXES) {
        if (ip.startsWith(prefix))
            return true;
    }
    // 172.16.0.0/12
    if (ip.startsWith("172.")) {
        const secondOctet = parseInt(ip.split(".")[1], 10);
        if (!Number.isNaN(secondOctet) &&
            secondOctet >= constants_1.PRIVATE_172_RANGE.min &&
            secondOctet <= constants_1.PRIVATE_172_RANGE.max) {
            return true;
        }
    }
    return false;
}
/**
 * Returns true when `host` is a private/non-routable IPv6 address.
 * Also detects IPv6-mapped IPv4 like `::ffff:127.0.0.1`.
 */
function isPrivateIpv6(host) {
    const lower = host.toLowerCase();
    for (const prefix of constants_1.PRIVATE_IPV6_PREFIXES) {
        if (lower === prefix || lower.startsWith(prefix))
            return true;
    }
    // IPv6-mapped IPv4:  ::ffff:A.B.C.D
    const mapped = lower.match(/^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
    if (mapped && isPrivateIpv4(mapped[1]))
        return true;
    return false;
}
/**
 * Validate that `endpoint` is a safe HTTPS URL, not pointing at private
 * infrastructure.  Throws a descriptive error string on failure.
 */
function validateToolEndpoint(endpoint) {
    let parsed;
    try {
        parsed = new URL(endpoint);
    }
    catch {
        throw new Error(`Invalid URL: ${endpoint}`);
    }
    if (parsed.protocol !== "https:") {
        throw new Error(`Tool endpoint must use HTTPS (got ${parsed.protocol.replace(":", "")}): ${endpoint}`);
    }
    const host = parsed.hostname.toLowerCase();
    // Blocked hostnames
    for (const blocked of constants_1.BLOCKED_HOSTNAMES) {
        if (host === blocked) {
            throw new Error(`Tool endpoint must not target ${blocked}: ${endpoint}`);
        }
    }
    // Strip brackets for IPv6 literals
    const bare = host.startsWith("[") && host.endsWith("]")
        ? host.slice(1, -1)
        : host;
    if (looksLikeIpv4(bare) && isPrivateIpv4(bare)) {
        throw new Error(`Tool endpoint must not target a private IP address: ${endpoint}`);
    }
    if (bare.includes(":") && isPrivateIpv6(bare)) {
        throw new Error(`Tool endpoint must not target a private IPv6 address: ${endpoint}`);
    }
}
// ── SSM path validation ─────────────────────────────────────────────── //
/**
 * Validate that `ssmPath` is scoped to the given business and does not
 * contain path-traversal sequences.
 */
function validateToolSsmPath(businessId, ssmPath) {
    const requiredPrefix = `/businesses/${businessId}/`;
    if (!ssmPath.startsWith(requiredPrefix)) {
        throw new Error(`auth_ssm_path must start with "${requiredPrefix}" (got "${ssmPath}")`);
    }
    if (ssmPath.includes("..")) {
        throw new Error(`auth_ssm_path must not contain path traversal sequences: "${ssmPath}"`);
    }
}
/**
 * Run endpoint + SSM-path security checks on every tool in the list.
 * Throws on the first violation with a message referencing the tool name.
 */
function validateAgentTools(businessId, tools) {
    for (const tool of tools) {
        if (tool.endpoint) {
            try {
                validateToolEndpoint(tool.endpoint);
            }
            catch (err) {
                throw new Error(`Tool "${tool.name}": ${err instanceof Error ? err.message : String(err)}`);
            }
        }
        if (tool.auth_ssm_path) {
            try {
                validateToolSsmPath(businessId, tool.auth_ssm_path);
            }
            catch (err) {
                throw new Error(`Tool "${tool.name}": ${err instanceof Error ? err.message : String(err)}`);
            }
        }
    }
}
