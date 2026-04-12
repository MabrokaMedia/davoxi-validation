/**
 * Zod schemas for Davoxi agent creation and update.
 *
 * All numeric limits come from `./constants` so there is exactly one
 * place to update when the backend changes.
 */
import { z } from "zod";
export declare const toolDefinitionSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    parameters: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    endpoint: z.ZodOptional<z.ZodString>;
    auth_ssm_path: z.ZodOptional<z.ZodString>;
    requires_confirmation: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
    endpoint?: string | undefined;
    auth_ssm_path?: string | undefined;
    requires_confirmation?: boolean | undefined;
}, {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
    endpoint?: string | undefined;
    auth_ssm_path?: string | undefined;
    requires_confirmation?: boolean | undefined;
}>;
export type ToolDefinitionInput = z.infer<typeof toolDefinitionSchema>;
export declare const createAgentSchema: z.ZodObject<{
    description: z.ZodString;
    system_prompt: z.ZodString;
    tools: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        parameters: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        endpoint: z.ZodOptional<z.ZodString>;
        auth_ssm_path: z.ZodOptional<z.ZodString>;
        requires_confirmation: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }, {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }>, "many">>;
    knowledge_sources: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    trigger_tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    description: string;
    system_prompt: string;
    tools?: {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }[] | undefined;
    knowledge_sources?: string[] | undefined;
    trigger_tags?: string[] | undefined;
    enabled?: boolean | undefined;
}, {
    description: string;
    system_prompt: string;
    tools?: {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }[] | undefined;
    knowledge_sources?: string[] | undefined;
    trigger_tags?: string[] | undefined;
    enabled?: boolean | undefined;
}>;
export type CreateAgentInput = z.infer<typeof createAgentSchema>;
export declare const updateAgentSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    system_prompt: z.ZodOptional<z.ZodString>;
    tools: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        parameters: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        endpoint: z.ZodOptional<z.ZodString>;
        auth_ssm_path: z.ZodOptional<z.ZodString>;
        requires_confirmation: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }, {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }>, "many">>;
    knowledge_sources: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    trigger_tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    system_prompt?: string | undefined;
    tools?: {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }[] | undefined;
    knowledge_sources?: string[] | undefined;
    trigger_tags?: string[] | undefined;
    enabled?: boolean | undefined;
}, {
    description?: string | undefined;
    system_prompt?: string | undefined;
    tools?: {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }[] | undefined;
    knowledge_sources?: string[] | undefined;
    trigger_tags?: string[] | undefined;
    enabled?: boolean | undefined;
}>;
export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
