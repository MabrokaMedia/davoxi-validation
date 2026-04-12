/**
 * Shared validation constants for Davoxi agent APIs.
 *
 * These limits are the single source of truth and MUST match the Rust admin
 * Lambda (ai-phone-agent/rust/crates/admin/src/main.rs).  When the backend
 * limits change, update them here and every consumer picks them up.
 */
export declare const AGENT_LIMITS: {
    /** Max length of agent description. */
    readonly DESCRIPTION_MAX: 5000;
    /** Max length of agent system prompt. */
    readonly SYSTEM_PROMPT_MAX: 10000;
    /** Max number of trigger tags per agent. */
    readonly TRIGGER_TAGS_MAX: 20;
    /** Max length of a single trigger tag. */
    readonly TRIGGER_TAG_LENGTH_MAX: 100;
    /** Max number of knowledge source URLs per agent. */
    readonly KNOWLEDGE_SOURCES_MAX: 10;
    /** Max length of agent_id (create only). */
    readonly AGENT_ID_MAX: 50;
    /** Allowed characters in agent_id. */
    readonly AGENT_ID_PATTERN: RegExp;
};
export declare const TOOL_LIMITS: {
    /** Max length of tool name. */
    readonly NAME_MAX: 100;
    /** Max length of tool description. */
    readonly DESCRIPTION_MAX: 1000;
    /** Max length of SSM parameter path. */
    readonly SSM_PATH_MAX: 500;
};
/** IPv4 CIDR prefixes that are considered private / non-routable. */
export declare const PRIVATE_IPV4_PREFIXES: readonly ["127.", "10.", "192.168.", "169.254.", "0."];
/**
 * IPv4 172.16.0.0/12 range check boundaries.
 * Second octet must be 16..31 inclusive.
 */
export declare const PRIVATE_172_RANGE: {
    readonly min: 16;
    readonly max: 31;
};
/** IPv6 prefixes that are considered private / non-routable. */
export declare const PRIVATE_IPV6_PREFIXES: readonly ["::1", "::", "fe80:", "fc00:", "fd00:"];
/** Hostnames that must be blocked in tool endpoints. */
export declare const BLOCKED_HOSTNAMES: readonly ["localhost", "ip6-localhost"];
