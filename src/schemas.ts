/**
 * Zod schemas for Davoxi agent creation and update.
 *
 * All numeric limits come from `./constants` so there is exactly one
 * place to update when the backend changes.
 */

import { z } from "zod";
import { AGENT_LIMITS, TOOL_LIMITS } from "./constants";

// ── Tool definition ─────────────────────────────────────────────────── //

export const toolDefinitionSchema = z.object({
  name: z
    .string()
    .min(1, "Tool name is required")
    .max(TOOL_LIMITS.NAME_MAX, `Tool name must be at most ${TOOL_LIMITS.NAME_MAX} characters`),
  description: z
    .string()
    .min(1, "Tool description is required")
    .max(
      TOOL_LIMITS.DESCRIPTION_MAX,
      `Tool description must be at most ${TOOL_LIMITS.DESCRIPTION_MAX} characters`,
    ),
  parameters: z.record(z.unknown()).describe("JSON Schema describing the tool's parameters."),
  endpoint: z.string().url("Tool endpoint must be a valid URL").optional(),
  http_method: z
    .enum(["GET", "POST", "PUT", "PATCH", "DELETE"])
    .optional()
    .describe("HTTP method for the tool endpoint. Defaults to POST."),
  auth_ssm_path: z
    .string()
    .max(
      TOOL_LIMITS.SSM_PATH_MAX,
      `SSM path must be at most ${TOOL_LIMITS.SSM_PATH_MAX} characters`,
    )
    .optional()
    .describe("SSM parameter path for auth credentials. Leave empty/omitted for public APIs."),
  requires_confirmation: z.boolean().optional(),
});

export type ToolDefinitionInput = z.infer<typeof toolDefinitionSchema>;

// ── Agent permissions ──────────────────────────────────────────────── //

const readWritePermSchema = z.object({
  read: z.boolean(),
  write: z.boolean(),
});

export const agentPermissionsSchema = z.object({
  tool_access: z.object({
    mode: z.enum(["allow_all", "allow_list", "deny_list"]),
    tools: z.array(z.string()).optional().default([]),
  }).optional(),
  memory: z.object({
    session: readWritePermSchema.optional(),
    caller: readWritePermSchema.optional(),
    business: readWritePermSchema.optional(),
    kind: readWritePermSchema.optional(),
    global: readWritePermSchema.optional(),
  }).optional(),
  pii_policy: z.enum(["allow", "redact", "forbid"]).optional(),
  budget: z.object({
    tokens_per_turn: z.number().int().min(1).max(1000000).optional(),
    tool_calls: z.number().int().min(1).max(1000).optional(),
    wall_clock_ms: z.number().int().min(1000).max(300000).optional(),
  }).optional(),
  cross_org: z.object({
    mode: z.enum(["in_org_only", "approved", "allow"]),
    approved_businesses: z.array(z.string()).optional(),
  }).optional(),
  allowed_agents: z.array(z.string()).optional().describe("Agent IDs this agent can hand off to. Omit for unrestricted."),
  allowed_hosts: z.array(z.string()).optional().describe("External domains this agent can reach. Omit to auto-derive from tools."),
});

export type AgentPermissionsInput = z.infer<typeof agentPermissionsSchema>;

// ── Create agent ────────────────────────────────────────────────────── //

export const createAgentSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .max(
      AGENT_LIMITS.DESCRIPTION_MAX,
      `Description must be at most ${AGENT_LIMITS.DESCRIPTION_MAX} characters`,
    ),
  system_prompt: z
    .string()
    .min(1, "System prompt is required")
    .max(
      AGENT_LIMITS.SYSTEM_PROMPT_MAX,
      `System prompt must be at most ${AGENT_LIMITS.SYSTEM_PROMPT_MAX} characters`,
    ),
  tools: z.array(toolDefinitionSchema).optional(),
  knowledge_sources: z
    .array(z.string().url("Knowledge source must be a valid URL"))
    .max(
      AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX,
      `At most ${AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX} knowledge sources allowed`,
    )
    .optional(),
  trigger_tags: z
    .array(
      z
        .string()
        .min(1, "Trigger tag must not be empty")
        .max(
          AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX,
          `Each trigger tag must be at most ${AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX} characters`,
        ),
    )
    .max(
      AGENT_LIMITS.TRIGGER_TAGS_MAX,
      `At most ${AGENT_LIMITS.TRIGGER_TAGS_MAX} trigger tags allowed`,
    )
    .optional(),
  enabled: z.boolean().optional(),
  permissions: agentPermissionsSchema.optional(),
});

export type CreateAgentInput = z.infer<typeof createAgentSchema>;

// ── Update agent (all fields optional) ──────────────────────────────── //

export const updateAgentSchema = z.object({
  description: z
    .string()
    .min(1, "Description must not be empty")
    .max(
      AGENT_LIMITS.DESCRIPTION_MAX,
      `Description must be at most ${AGENT_LIMITS.DESCRIPTION_MAX} characters`,
    )
    .optional(),
  system_prompt: z
    .string()
    .min(1, "System prompt must not be empty")
    .max(
      AGENT_LIMITS.SYSTEM_PROMPT_MAX,
      `System prompt must be at most ${AGENT_LIMITS.SYSTEM_PROMPT_MAX} characters`,
    )
    .optional(),
  tools: z.array(toolDefinitionSchema).optional(),
  knowledge_sources: z
    .array(z.string().url("Knowledge source must be a valid URL"))
    .max(
      AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX,
      `At most ${AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX} knowledge sources allowed`,
    )
    .optional(),
  trigger_tags: z
    .array(
      z
        .string()
        .min(1, "Trigger tag must not be empty")
        .max(
          AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX,
          `Each trigger tag must be at most ${AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX} characters`,
        ),
    )
    .max(
      AGENT_LIMITS.TRIGGER_TAGS_MAX,
      `At most ${AGENT_LIMITS.TRIGGER_TAGS_MAX} trigger tags allowed`,
    )
    .optional(),
  enabled: z.boolean().optional(),
  permissions: agentPermissionsSchema.optional().nullable(),
});

export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
