"use strict";
/**
 * Zod schemas for Davoxi agent creation and update.
 *
 * All numeric limits come from `./constants` so there is exactly one
 * place to update when the backend changes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgentSchema = exports.createAgentSchema = exports.agentPermissionsSchema = exports.toolDefinitionSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("./constants");
// ── Tool definition ─────────────────────────────────────────────────── //
exports.toolDefinitionSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Tool name is required")
        .max(constants_1.TOOL_LIMITS.NAME_MAX, `Tool name must be at most ${constants_1.TOOL_LIMITS.NAME_MAX} characters`),
    description: zod_1.z
        .string()
        .min(1, "Tool description is required")
        .max(constants_1.TOOL_LIMITS.DESCRIPTION_MAX, `Tool description must be at most ${constants_1.TOOL_LIMITS.DESCRIPTION_MAX} characters`),
    parameters: zod_1.z.record(zod_1.z.unknown()).describe("JSON Schema describing the tool's parameters."),
    endpoint: zod_1.z.string().url("Tool endpoint must be a valid URL").optional(),
    http_method: zod_1.z
        .enum(["GET", "POST", "PUT", "PATCH", "DELETE"])
        .optional()
        .describe("HTTP method for the tool endpoint. Defaults to POST."),
    auth_ssm_path: zod_1.z
        .string()
        .max(constants_1.TOOL_LIMITS.SSM_PATH_MAX, `SSM path must be at most ${constants_1.TOOL_LIMITS.SSM_PATH_MAX} characters`)
        .optional()
        .describe("SSM parameter path for auth credentials. Leave empty/omitted for public APIs."),
    requires_confirmation: zod_1.z.boolean().optional(),
});
// ── Agent permissions ──────────────────────────────────────────────── //
const readWritePermSchema = zod_1.z.object({
    read: zod_1.z.boolean(),
    write: zod_1.z.boolean(),
});
exports.agentPermissionsSchema = zod_1.z.object({
    tool_access: zod_1.z.object({
        mode: zod_1.z.enum(["allow_all", "allow_list", "deny_list"]),
        tools: zod_1.z.array(zod_1.z.string()).optional().default([]),
    }).optional(),
    memory: zod_1.z.object({
        session: readWritePermSchema.optional(),
        caller: readWritePermSchema.optional(),
        business: readWritePermSchema.optional(),
        kind: readWritePermSchema.optional(),
        global: readWritePermSchema.optional(),
    }).optional(),
    pii_policy: zod_1.z.enum(["allow", "redact", "forbid"]).optional(),
    budget: zod_1.z.object({
        tokens_per_turn: zod_1.z.number().int().min(1).max(1000000).optional(),
        tool_calls: zod_1.z.number().int().min(1).max(1000).optional(),
        wall_clock_ms: zod_1.z.number().int().min(1000).max(300000).optional(),
    }).optional(),
    cross_org: zod_1.z.object({
        mode: zod_1.z.enum(["in_org_only", "approved", "allow"]),
        approved_businesses: zod_1.z.array(zod_1.z.string()).optional(),
    }).optional(),
    allowed_agents: zod_1.z.array(zod_1.z.string()).optional().describe("Agent IDs this agent can hand off to. Omit for unrestricted."),
    allowed_hosts: zod_1.z.array(zod_1.z.string()).optional().describe("External domains this agent can reach. Omit to auto-derive from tools."),
});
// ── Create agent ────────────────────────────────────────────────────── //
exports.createAgentSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, "Description is required")
        .max(constants_1.AGENT_LIMITS.DESCRIPTION_MAX, `Description must be at most ${constants_1.AGENT_LIMITS.DESCRIPTION_MAX} characters`),
    system_prompt: zod_1.z
        .string()
        .min(1, "System prompt is required")
        .max(constants_1.AGENT_LIMITS.SYSTEM_PROMPT_MAX, `System prompt must be at most ${constants_1.AGENT_LIMITS.SYSTEM_PROMPT_MAX} characters`),
    tools: zod_1.z.array(exports.toolDefinitionSchema).optional(),
    knowledge_sources: zod_1.z
        .array(zod_1.z.string().url("Knowledge source must be a valid URL"))
        .max(constants_1.AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX, `At most ${constants_1.AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX} knowledge sources allowed`)
        .optional(),
    trigger_tags: zod_1.z
        .array(zod_1.z
        .string()
        .min(1, "Trigger tag must not be empty")
        .max(constants_1.AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX, `Each trigger tag must be at most ${constants_1.AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX} characters`))
        .max(constants_1.AGENT_LIMITS.TRIGGER_TAGS_MAX, `At most ${constants_1.AGENT_LIMITS.TRIGGER_TAGS_MAX} trigger tags allowed`)
        .optional(),
    enabled: zod_1.z.boolean().optional(),
    permissions: exports.agentPermissionsSchema.optional(),
});
// ── Update agent (all fields optional) ──────────────────────────────── //
exports.updateAgentSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, "Description must not be empty")
        .max(constants_1.AGENT_LIMITS.DESCRIPTION_MAX, `Description must be at most ${constants_1.AGENT_LIMITS.DESCRIPTION_MAX} characters`)
        .optional(),
    system_prompt: zod_1.z
        .string()
        .min(1, "System prompt must not be empty")
        .max(constants_1.AGENT_LIMITS.SYSTEM_PROMPT_MAX, `System prompt must be at most ${constants_1.AGENT_LIMITS.SYSTEM_PROMPT_MAX} characters`)
        .optional(),
    tools: zod_1.z.array(exports.toolDefinitionSchema).optional(),
    knowledge_sources: zod_1.z
        .array(zod_1.z.string().url("Knowledge source must be a valid URL"))
        .max(constants_1.AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX, `At most ${constants_1.AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX} knowledge sources allowed`)
        .optional(),
    trigger_tags: zod_1.z
        .array(zod_1.z
        .string()
        .min(1, "Trigger tag must not be empty")
        .max(constants_1.AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX, `Each trigger tag must be at most ${constants_1.AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX} characters`))
        .max(constants_1.AGENT_LIMITS.TRIGGER_TAGS_MAX, `At most ${constants_1.AGENT_LIMITS.TRIGGER_TAGS_MAX} trigger tags allowed`)
        .optional(),
    enabled: zod_1.z.boolean().optional(),
    permissions: exports.agentPermissionsSchema.optional().nullable(),
});
