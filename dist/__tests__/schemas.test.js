"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const schemas_1 = require("../schemas");
const constants_1 = require("../constants");
// ── toolDefinitionSchema ──────────────────────────────────────────── //
(0, vitest_1.describe)("toolDefinitionSchema", () => {
    const valid = {
        name: "book_appointment",
        description: "Books an appointment for the caller",
        parameters: { type: "object", properties: { date: { type: "string" } } },
        endpoint: "https://api.example.com/book",
        auth_ssm_path: "/businesses/biz1/api-key",
        requires_confirmation: true,
    };
    (0, vitest_1.it)("accepts a valid tool", () => {
        (0, vitest_1.expect)(() => schemas_1.toolDefinitionSchema.parse(valid)).not.toThrow();
    });
    (0, vitest_1.it)("rejects empty name", () => {
        const result = schemas_1.toolDefinitionSchema.safeParse({ ...valid, name: "" });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects name exceeding max", () => {
        const result = schemas_1.toolDefinitionSchema.safeParse({
            ...valid,
            name: "a".repeat(constants_1.TOOL_LIMITS.NAME_MAX + 1),
        });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects invalid endpoint URL", () => {
        const result = schemas_1.toolDefinitionSchema.safeParse({ ...valid, endpoint: "not-a-url" });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("allows optional fields to be omitted", () => {
        const minimal = {
            name: "test",
            description: "test tool",
            parameters: {},
        };
        (0, vitest_1.expect)(() => schemas_1.toolDefinitionSchema.parse(minimal)).not.toThrow();
    });
});
// ── createAgentSchema ─────────────────────────────────────────────── //
(0, vitest_1.describe)("createAgentSchema", () => {
    const valid = {
        description: "Appointment booking specialist",
        system_prompt: "You help callers book appointments.",
    };
    (0, vitest_1.it)("accepts minimal valid input", () => {
        (0, vitest_1.expect)(() => schemas_1.createAgentSchema.parse(valid)).not.toThrow();
    });
    (0, vitest_1.it)("accepts full input", () => {
        const full = {
            ...valid,
            tools: [
                {
                    name: "book",
                    description: "Book appointment",
                    parameters: {},
                    endpoint: "https://api.example.com/book",
                    auth_ssm_path: "/businesses/biz1/key",
                    requires_confirmation: true,
                },
            ],
            knowledge_sources: ["https://docs.example.com/faq"],
            trigger_tags: ["booking", "appointment"],
            enabled: true,
        };
        (0, vitest_1.expect)(() => schemas_1.createAgentSchema.parse(full)).not.toThrow();
    });
    (0, vitest_1.it)("rejects empty description", () => {
        const result = schemas_1.createAgentSchema.safeParse({ ...valid, description: "" });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects description exceeding max", () => {
        const result = schemas_1.createAgentSchema.safeParse({
            ...valid,
            description: "a".repeat(constants_1.AGENT_LIMITS.DESCRIPTION_MAX + 1),
        });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects empty system_prompt", () => {
        const result = schemas_1.createAgentSchema.safeParse({ ...valid, system_prompt: "" });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects system_prompt exceeding max (was 50K in MCP, now 10K)", () => {
        const result = schemas_1.createAgentSchema.safeParse({
            ...valid,
            system_prompt: "a".repeat(constants_1.AGENT_LIMITS.SYSTEM_PROMPT_MAX + 1),
        });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects too many trigger tags (was 50 in MCP, now 20)", () => {
        const tags = Array.from({ length: constants_1.AGENT_LIMITS.TRIGGER_TAGS_MAX + 1 }, (_, i) => `tag${i}`);
        const result = schemas_1.createAgentSchema.safeParse({ ...valid, trigger_tags: tags });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects too many knowledge sources (was 20 in MCP, now 10)", () => {
        const sources = Array.from({ length: constants_1.AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX + 1 }, (_, i) => `https://example.com/doc${i}`);
        const result = schemas_1.createAgentSchema.safeParse({ ...valid, knowledge_sources: sources });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects trigger tag exceeding length limit", () => {
        const result = schemas_1.createAgentSchema.safeParse({
            ...valid,
            trigger_tags: ["a".repeat(constants_1.AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX + 1)],
        });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
});
// ── updateAgentSchema ─────────────────────────────────────────────── //
(0, vitest_1.describe)("updateAgentSchema", () => {
    (0, vitest_1.it)("accepts empty object (no fields to update)", () => {
        (0, vitest_1.expect)(() => schemas_1.updateAgentSchema.parse({})).not.toThrow();
    });
    (0, vitest_1.it)("accepts partial update", () => {
        (0, vitest_1.expect)(() => schemas_1.updateAgentSchema.parse({ description: "Updated desc" })).not.toThrow();
    });
    (0, vitest_1.it)("rejects description exceeding max", () => {
        const result = schemas_1.updateAgentSchema.safeParse({
            description: "a".repeat(constants_1.AGENT_LIMITS.DESCRIPTION_MAX + 1),
        });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
    (0, vitest_1.it)("rejects system_prompt exceeding max", () => {
        const result = schemas_1.updateAgentSchema.safeParse({
            system_prompt: "a".repeat(constants_1.AGENT_LIMITS.SYSTEM_PROMPT_MAX + 1),
        });
        (0, vitest_1.expect)(result.success).toBe(false);
    });
});
