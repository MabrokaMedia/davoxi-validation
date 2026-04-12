import { describe, it, expect } from "vitest";
import {
  validateToolEndpoint,
  validateToolSsmPath,
  validateAgentTools,
} from "../validators";

// ── validateToolEndpoint ────────────────────────────────────────────── //

describe("validateToolEndpoint", () => {
  it("accepts valid HTTPS URL", () => {
    expect(() => validateToolEndpoint("https://api.example.com/book")).not.toThrow();
  });

  it("rejects HTTP (non-HTTPS)", () => {
    expect(() => validateToolEndpoint("http://api.example.com/book")).toThrow("HTTPS");
  });

  it("rejects non-URL string", () => {
    expect(() => validateToolEndpoint("not-a-url")).toThrow("Invalid URL");
  });

  it("rejects localhost", () => {
    expect(() => validateToolEndpoint("https://localhost/hook")).toThrow("localhost");
  });

  it("rejects ip6-localhost", () => {
    expect(() => validateToolEndpoint("https://ip6-localhost/hook")).toThrow("ip6-localhost");
  });

  // IPv4 private ranges
  it("rejects 127.x.x.x loopback", () => {
    expect(() => validateToolEndpoint("https://127.0.0.1/hook")).toThrow("private");
  });

  it("rejects 10.x.x.x", () => {
    expect(() => validateToolEndpoint("https://10.0.0.5/hook")).toThrow("private");
  });

  it("rejects 172.16.x.x", () => {
    expect(() => validateToolEndpoint("https://172.16.0.1/hook")).toThrow("private");
  });

  it("rejects 172.31.x.x (top of /12 range)", () => {
    expect(() => validateToolEndpoint("https://172.31.255.255/hook")).toThrow("private");
  });

  it("allows 172.15.x.x (just outside /12 range)", () => {
    expect(() => validateToolEndpoint("https://172.15.0.1/hook")).not.toThrow();
  });

  it("allows 172.32.x.x (just outside /12 range)", () => {
    expect(() => validateToolEndpoint("https://172.32.0.1/hook")).not.toThrow();
  });

  it("rejects 192.168.x.x", () => {
    expect(() => validateToolEndpoint("https://192.168.1.1/hook")).toThrow("private");
  });

  it("rejects 169.254.x.x link-local", () => {
    expect(() => validateToolEndpoint("https://169.254.169.254/hook")).toThrow("private");
  });

  it("rejects 0.x.x.x", () => {
    expect(() => validateToolEndpoint("https://0.0.0.0/hook")).toThrow("private");
  });

  // IPv6 — these require bracket notation in URLs
  it("rejects ::1 loopback", () => {
    expect(() => validateToolEndpoint("https://[::1]/hook")).toThrow("private IPv6");
  });

  it("rejects fe80:: link-local", () => {
    expect(() => validateToolEndpoint("https://[fe80::1]/hook")).toThrow("private IPv6");
  });

  it("rejects fc00:: unique local", () => {
    expect(() => validateToolEndpoint("https://[fc00::1]/hook")).toThrow("private IPv6");
  });

  it("rejects fd00:: unique local", () => {
    expect(() => validateToolEndpoint("https://[fd00::1]/hook")).toThrow("private IPv6");
  });

  it("rejects IPv6-mapped IPv4 private", () => {
    expect(() => validateToolEndpoint("https://[::ffff:127.0.0.1]/hook")).toThrow(
      "private IPv6",
    );
  });

  it("accepts public IPv4", () => {
    expect(() => validateToolEndpoint("https://203.0.113.1/hook")).not.toThrow();
  });
});

// ── validateToolSsmPath ─────────────────────────────────────────────── //

describe("validateToolSsmPath", () => {
  const biz = "biz_abc123";

  it("accepts correctly scoped path", () => {
    expect(() =>
      validateToolSsmPath(biz, `/businesses/${biz}/api-key`),
    ).not.toThrow();
  });

  it("accepts nested path under business", () => {
    expect(() =>
      validateToolSsmPath(biz, `/businesses/${biz}/tools/booking/key`),
    ).not.toThrow();
  });

  it("rejects path without business prefix", () => {
    expect(() =>
      validateToolSsmPath(biz, "/global/some-key"),
    ).toThrow("must start with");
  });

  it("rejects path scoped to different business", () => {
    expect(() =>
      validateToolSsmPath(biz, "/businesses/OTHER_BIZ/api-key"),
    ).toThrow("must start with");
  });

  it("rejects path traversal (..) attempt", () => {
    expect(() =>
      validateToolSsmPath(biz, `/businesses/${biz}/../other-biz/key`),
    ).toThrow("path traversal");
  });
});

// ── validateAgentTools ──────────────────────────────────────────────── //

describe("validateAgentTools", () => {
  const biz = "biz_test";

  it("passes with valid tools", () => {
    expect(() =>
      validateAgentTools(biz, [
        {
          name: "book",
          endpoint: "https://api.example.com/book",
          auth_ssm_path: `/businesses/${biz}/book-key`,
        },
      ]),
    ).not.toThrow();
  });

  it("fails when one tool has bad endpoint", () => {
    expect(() =>
      validateAgentTools(biz, [
        { name: "bad_tool", endpoint: "http://localhost/bad" },
      ]),
    ).toThrow('Tool "bad_tool"');
  });

  it("fails when one tool has bad SSM path", () => {
    expect(() =>
      validateAgentTools(biz, [
        { name: "bad_ssm", auth_ssm_path: "/global/secret" },
      ]),
    ).toThrow('Tool "bad_ssm"');
  });

  it("passes when tools have no endpoint or SSM path", () => {
    expect(() =>
      validateAgentTools(biz, [{ name: "simple_tool" }]),
    ).not.toThrow();
  });
});
