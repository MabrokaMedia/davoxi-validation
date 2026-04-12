"use strict";
/**
 * Shared validation constants for Davoxi agent APIs.
 *
 * These limits are the single source of truth and MUST match the Rust admin
 * Lambda (ai-phone-agent/rust/crates/admin/src/main.rs).  When the backend
 * limits change, update them here and every consumer picks them up.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKED_HOSTNAMES = exports.PRIVATE_IPV6_PREFIXES = exports.PRIVATE_172_RANGE = exports.PRIVATE_IPV4_PREFIXES = exports.TOOL_LIMITS = exports.AGENT_LIMITS = void 0;
// ── Agent field limits ──────────────────────────────────────────────── //
exports.AGENT_LIMITS = {
    /** Max length of agent description. */
    DESCRIPTION_MAX: 5_000,
    /** Max length of agent system prompt. */
    SYSTEM_PROMPT_MAX: 10_000,
    /** Max number of trigger tags per agent. */
    TRIGGER_TAGS_MAX: 20,
    /** Max length of a single trigger tag. */
    TRIGGER_TAG_LENGTH_MAX: 100,
    /** Max number of knowledge source URLs per agent. */
    KNOWLEDGE_SOURCES_MAX: 10,
    /** Max length of agent_id (create only). */
    AGENT_ID_MAX: 50,
    /** Allowed characters in agent_id. */
    AGENT_ID_PATTERN: /^[a-zA-Z0-9_-]+$/,
};
// ── Tool field limits ───────────────────────────────────────────────── //
exports.TOOL_LIMITS = {
    /** Max length of tool name. */
    NAME_MAX: 100,
    /** Max length of tool description. */
    DESCRIPTION_MAX: 1_000,
    /** Max length of SSM parameter path. */
    SSM_PATH_MAX: 500,
};
// ── SSRF blocklist ──────────────────────────────────────────────────── //
/** IPv4 CIDR prefixes that are considered private / non-routable. */
exports.PRIVATE_IPV4_PREFIXES = [
    "127.", // loopback
    "10.", // class A private
    "192.168.", // class C private
    "169.254.", // link-local
    "0.", // current network
];
/**
 * IPv4 172.16.0.0/12 range check boundaries.
 * Second octet must be 16..31 inclusive.
 */
exports.PRIVATE_172_RANGE = { min: 16, max: 31 };
/** IPv6 prefixes that are considered private / non-routable. */
exports.PRIVATE_IPV6_PREFIXES = [
    "::1", // loopback
    "::", // unspecified (exact match)
    "fe80:", // link-local
    "fc00:", // unique local (fc00::/7 — fc00: and fd00:)
    "fd00:",
];
/** Hostnames that must be blocked in tool endpoints. */
exports.BLOCKED_HOSTNAMES = [
    "localhost",
    "ip6-localhost",
];
