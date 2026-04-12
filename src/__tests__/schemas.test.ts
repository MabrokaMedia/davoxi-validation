import { describe, it, expect } from "vitest";
import { createAgentSchema, updateAgentSchema, toolDefinitionSchema } from "../schemas";
import { AGENT_LIMITS, TOOL_LIMITS } from "../constants";

// ── toolDefinitionSchema ──────────────────────────────────────────── //

describe("toolDefinitionSchema", () => {
  const valid = {
    name: "book_appointment",
    description: "Books an appointment for the caller",
    parameters: { type: "object", properties: { date: { type: "string" } } },
    endpoint: "https://api.example.com/book",
    auth_ssm_path: "/businesses/biz1/api-key",
    requires_confirmation: true,
  };

  it("accepts a valid tool", () => {
    expect(() => toolDefinitionSchema.parse(valid)).not.toThrow();
  });

  it("rejects empty name", () => {
    const result = toolDefinitionSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max", () => {
    const result = toolDefinitionSchema.safeParse({
      ...valid,
      name: "a".repeat(TOOL_LIMITS.NAME_MAX + 1),
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid endpoint URL", () => {
    const result = toolDefinitionSchema.safeParse({ ...valid, endpoint: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("allows optional fields to be omitted", () => {
    const minimal = {
      name: "test",
      description: "test tool",
      parameters: {},
    };
    expect(() => toolDefinitionSchema.parse(minimal)).not.toThrow();
  });
});

// ── createAgentSchema ─────────────────────────────────────────────── //

describe("createAgentSchema", () => {
  const valid = {
    description: "Appointment booking specialist",
    system_prompt: "You help callers book appointments.",
  };

  it("accepts minimal valid input", () => {
    expect(() => createAgentSchema.parse(valid)).not.toThrow();
  });

  it("accepts full input", () => {
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
    expect(() => createAgentSchema.parse(full)).not.toThrow();
  });

  it("rejects empty description", () => {
    const result = createAgentSchema.safeParse({ ...valid, description: "" });
    expect(result.success).toBe(false);
  });

  it("rejects description exceeding max", () => {
    const result = createAgentSchema.safeParse({
      ...valid,
      description: "a".repeat(AGENT_LIMITS.DESCRIPTION_MAX + 1),
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty system_prompt", () => {
    const result = createAgentSchema.safeParse({ ...valid, system_prompt: "" });
    expect(result.success).toBe(false);
  });

  it("rejects system_prompt exceeding max (was 50K in MCP, now 10K)", () => {
    const result = createAgentSchema.safeParse({
      ...valid,
      system_prompt: "a".repeat(AGENT_LIMITS.SYSTEM_PROMPT_MAX + 1),
    });
    expect(result.success).toBe(false);
  });

  it("rejects too many trigger tags (was 50 in MCP, now 20)", () => {
    const tags = Array.from({ length: AGENT_LIMITS.TRIGGER_TAGS_MAX + 1 }, (_, i) => `tag${i}`);
    const result = createAgentSchema.safeParse({ ...valid, trigger_tags: tags });
    expect(result.success).toBe(false);
  });

  it("rejects too many knowledge sources (was 20 in MCP, now 10)", () => {
    const sources = Array.from(
      { length: AGENT_LIMITS.KNOWLEDGE_SOURCES_MAX + 1 },
      (_, i) => `https://example.com/doc${i}`,
    );
    const result = createAgentSchema.safeParse({ ...valid, knowledge_sources: sources });
    expect(result.success).toBe(false);
  });

  it("rejects trigger tag exceeding length limit", () => {
    const result = createAgentSchema.safeParse({
      ...valid,
      trigger_tags: ["a".repeat(AGENT_LIMITS.TRIGGER_TAG_LENGTH_MAX + 1)],
    });
    expect(result.success).toBe(false);
  });
});

// ── updateAgentSchema ─────────────────────────────────────────────── //

describe("updateAgentSchema", () => {
  it("accepts empty object (no fields to update)", () => {
    expect(() => updateAgentSchema.parse({})).not.toThrow();
  });

  it("accepts partial update", () => {
    expect(() => updateAgentSchema.parse({ description: "Updated desc" })).not.toThrow();
  });

  it("rejects description exceeding max", () => {
    const result = updateAgentSchema.safeParse({
      description: "a".repeat(AGENT_LIMITS.DESCRIPTION_MAX + 1),
    });
    expect(result.success).toBe(false);
  });

  it("rejects system_prompt exceeding max", () => {
    const result = updateAgentSchema.safeParse({
      system_prompt: "a".repeat(AGENT_LIMITS.SYSTEM_PROMPT_MAX + 1),
    });
    expect(result.success).toBe(false);
  });
});
