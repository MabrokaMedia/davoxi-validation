/**
 * Shared validation constants for Davoxi agent APIs.
 *
 * These limits are the single source of truth and MUST match the Rust admin
 * Lambda (ai-phone-agent/rust/crates/admin/src/main.rs).  When the backend
 * limits change, update them here and every consumer picks them up.
 */

// ── Agent field limits ──────────────────────────────────────────────── //

export const AGENT_LIMITS = {
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
} as const;

// ── Tool field limits ───────────────────────────────────────────────── //

export const TOOL_LIMITS = {
  /** Max length of tool name. */
  NAME_MAX: 100,
  /** Max length of tool description. */
  DESCRIPTION_MAX: 1_000,
  /** Max length of SSM parameter path. */
  SSM_PATH_MAX: 500,
} as const;

// ── SSRF blocklist ──────────────────────────────────────────────────── //

/** IPv4 CIDR prefixes that are considered private / non-routable. */
export const PRIVATE_IPV4_PREFIXES = [
  "127.",       // loopback
  "10.",        // class A private
  "192.168.",   // class C private
  "169.254.",   // link-local
  "0.",         // current network
] as const;

/**
 * IPv4 172.16.0.0/12 range check boundaries.
 * Second octet must be 16..31 inclusive.
 */
export const PRIVATE_172_RANGE = { min: 16, max: 31 } as const;

/** IPv6 prefixes that are considered private / non-routable. */
export const PRIVATE_IPV6_PREFIXES = [
  "::1",       // loopback
  "::",        // unspecified (exact match)
  "fe80:",     // link-local
  "fc00:",     // unique local (fc00::/7 — fc00: and fd00:)
  "fd00:",
] as const;

/** Hostnames that must be blocked in tool endpoints. */
export const BLOCKED_HOSTNAMES = [
  "localhost",
  "ip6-localhost",
] as const;
