/**
 * Security validators ported from the Rust admin Lambda.
 *
 * These catch SSRF attempts and SSM path-traversal attacks client-side,
 * providing fast feedback without a server round-trip.  The admin Lambda
 * performs the same checks server-side as defense-in-depth.
 */
/**
 * Validate that `endpoint` is a safe HTTPS URL, not pointing at private
 * infrastructure.  Throws a descriptive error string on failure.
 */
export declare function validateToolEndpoint(endpoint: string): void;
/**
 * Validate that `ssmPath` is scoped to the given business and does not
 * contain path-traversal sequences.
 */
export declare function validateToolSsmPath(businessId: string, ssmPath: string): void;
export interface ToolLike {
    name: string;
    endpoint?: string;
    auth_ssm_path?: string;
}
/**
 * Run endpoint + SSM-path security checks on every tool in the list.
 * Throws on the first violation with a message referencing the tool name.
 */
export declare function validateAgentTools(businessId: string, tools: ToolLike[]): void;
