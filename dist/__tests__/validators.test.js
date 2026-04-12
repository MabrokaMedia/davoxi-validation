"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validators_1 = require("../validators");
// ── validateToolEndpoint ────────────────────────────────────────────── //
(0, vitest_1.describe)("validateToolEndpoint", () => {
    (0, vitest_1.it)("accepts valid HTTPS URL", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://api.example.com/book")).not.toThrow();
    });
    (0, vitest_1.it)("rejects HTTP (non-HTTPS)", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("http://api.example.com/book")).toThrow("HTTPS");
    });
    (0, vitest_1.it)("rejects non-URL string", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("not-a-url")).toThrow("Invalid URL");
    });
    (0, vitest_1.it)("rejects localhost", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://localhost/hook")).toThrow("localhost");
    });
    (0, vitest_1.it)("rejects ip6-localhost", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://ip6-localhost/hook")).toThrow("ip6-localhost");
    });
    // IPv4 private ranges
    (0, vitest_1.it)("rejects 127.x.x.x loopback", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://127.0.0.1/hook")).toThrow("private");
    });
    (0, vitest_1.it)("rejects 10.x.x.x", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://10.0.0.5/hook")).toThrow("private");
    });
    (0, vitest_1.it)("rejects 172.16.x.x", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://172.16.0.1/hook")).toThrow("private");
    });
    (0, vitest_1.it)("rejects 172.31.x.x (top of /12 range)", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://172.31.255.255/hook")).toThrow("private");
    });
    (0, vitest_1.it)("allows 172.15.x.x (just outside /12 range)", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://172.15.0.1/hook")).not.toThrow();
    });
    (0, vitest_1.it)("allows 172.32.x.x (just outside /12 range)", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://172.32.0.1/hook")).not.toThrow();
    });
    (0, vitest_1.it)("rejects 192.168.x.x", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://192.168.1.1/hook")).toThrow("private");
    });
    (0, vitest_1.it)("rejects 169.254.x.x link-local", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://169.254.169.254/hook")).toThrow("private");
    });
    (0, vitest_1.it)("rejects 0.x.x.x", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://0.0.0.0/hook")).toThrow("private");
    });
    // IPv6 — these require bracket notation in URLs
    (0, vitest_1.it)("rejects ::1 loopback", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://[::1]/hook")).toThrow("private IPv6");
    });
    (0, vitest_1.it)("rejects fe80:: link-local", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://[fe80::1]/hook")).toThrow("private IPv6");
    });
    (0, vitest_1.it)("rejects fc00:: unique local", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://[fc00::1]/hook")).toThrow("private IPv6");
    });
    (0, vitest_1.it)("rejects fd00:: unique local", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://[fd00::1]/hook")).toThrow("private IPv6");
    });
    (0, vitest_1.it)("rejects IPv6-mapped IPv4 private", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://[::ffff:127.0.0.1]/hook")).toThrow("private IPv6");
    });
    (0, vitest_1.it)("accepts public IPv4", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolEndpoint)("https://203.0.113.1/hook")).not.toThrow();
    });
});
// ── validateToolSsmPath ─────────────────────────────────────────────── //
(0, vitest_1.describe)("validateToolSsmPath", () => {
    const biz = "biz_abc123";
    (0, vitest_1.it)("accepts correctly scoped path", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolSsmPath)(biz, `/businesses/${biz}/api-key`)).not.toThrow();
    });
    (0, vitest_1.it)("accepts nested path under business", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolSsmPath)(biz, `/businesses/${biz}/tools/booking/key`)).not.toThrow();
    });
    (0, vitest_1.it)("rejects path without business prefix", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolSsmPath)(biz, "/global/some-key")).toThrow("must start with");
    });
    (0, vitest_1.it)("rejects path scoped to different business", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolSsmPath)(biz, "/businesses/OTHER_BIZ/api-key")).toThrow("must start with");
    });
    (0, vitest_1.it)("rejects path traversal (..) attempt", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateToolSsmPath)(biz, `/businesses/${biz}/../other-biz/key`)).toThrow("path traversal");
    });
});
// ── validateAgentTools ──────────────────────────────────────────────── //
(0, vitest_1.describe)("validateAgentTools", () => {
    const biz = "biz_test";
    (0, vitest_1.it)("passes with valid tools", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateAgentTools)(biz, [
            {
                name: "book",
                endpoint: "https://api.example.com/book",
                auth_ssm_path: `/businesses/${biz}/book-key`,
            },
        ])).not.toThrow();
    });
    (0, vitest_1.it)("fails when one tool has bad endpoint", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateAgentTools)(biz, [
            { name: "bad_tool", endpoint: "http://localhost/bad" },
        ])).toThrow('Tool "bad_tool"');
    });
    (0, vitest_1.it)("fails when one tool has bad SSM path", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateAgentTools)(biz, [
            { name: "bad_ssm", auth_ssm_path: "/global/secret" },
        ])).toThrow('Tool "bad_ssm"');
    });
    (0, vitest_1.it)("passes when tools have no endpoint or SSM path", () => {
        (0, vitest_1.expect)(() => (0, validators_1.validateAgentTools)(biz, [{ name: "simple_tool" }])).not.toThrow();
    });
});
