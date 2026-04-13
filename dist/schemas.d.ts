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
export declare const agentPermissionsSchema: z.ZodObject<{
    tool_access: z.ZodOptional<z.ZodObject<{
        mode: z.ZodEnum<["allow_all", "allow_list", "deny_list"]>;
        tools: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        mode: "allow_all" | "allow_list" | "deny_list";
        tools: string[];
    }, {
        mode: "allow_all" | "allow_list" | "deny_list";
        tools?: string[] | undefined;
    }>>;
    memory: z.ZodOptional<z.ZodObject<{
        session: z.ZodOptional<z.ZodObject<{
            read: z.ZodBoolean;
            write: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            read: boolean;
            write: boolean;
        }, {
            read: boolean;
            write: boolean;
        }>>;
        caller: z.ZodOptional<z.ZodObject<{
            read: z.ZodBoolean;
            write: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            read: boolean;
            write: boolean;
        }, {
            read: boolean;
            write: boolean;
        }>>;
        business: z.ZodOptional<z.ZodObject<{
            read: z.ZodBoolean;
            write: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            read: boolean;
            write: boolean;
        }, {
            read: boolean;
            write: boolean;
        }>>;
        kind: z.ZodOptional<z.ZodObject<{
            read: z.ZodBoolean;
            write: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            read: boolean;
            write: boolean;
        }, {
            read: boolean;
            write: boolean;
        }>>;
        global: z.ZodOptional<z.ZodObject<{
            read: z.ZodBoolean;
            write: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            read: boolean;
            write: boolean;
        }, {
            read: boolean;
            write: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        session?: {
            read: boolean;
            write: boolean;
        } | undefined;
        caller?: {
            read: boolean;
            write: boolean;
        } | undefined;
        business?: {
            read: boolean;
            write: boolean;
        } | undefined;
        kind?: {
            read: boolean;
            write: boolean;
        } | undefined;
        global?: {
            read: boolean;
            write: boolean;
        } | undefined;
    }, {
        session?: {
            read: boolean;
            write: boolean;
        } | undefined;
        caller?: {
            read: boolean;
            write: boolean;
        } | undefined;
        business?: {
            read: boolean;
            write: boolean;
        } | undefined;
        kind?: {
            read: boolean;
            write: boolean;
        } | undefined;
        global?: {
            read: boolean;
            write: boolean;
        } | undefined;
    }>>;
    pii_policy: z.ZodOptional<z.ZodEnum<["allow", "redact", "forbid"]>>;
    budget: z.ZodOptional<z.ZodObject<{
        tokens_per_turn: z.ZodOptional<z.ZodNumber>;
        tool_calls: z.ZodOptional<z.ZodNumber>;
        wall_clock_ms: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tokens_per_turn?: number | undefined;
        tool_calls?: number | undefined;
        wall_clock_ms?: number | undefined;
    }, {
        tokens_per_turn?: number | undefined;
        tool_calls?: number | undefined;
        wall_clock_ms?: number | undefined;
    }>>;
    cross_org: z.ZodOptional<z.ZodObject<{
        mode: z.ZodEnum<["in_org_only", "approved", "allow"]>;
        approved_businesses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        mode: "allow" | "in_org_only" | "approved";
        approved_businesses?: string[] | undefined;
    }, {
        mode: "allow" | "in_org_only" | "approved";
        approved_businesses?: string[] | undefined;
    }>>;
    allowed_agents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowed_hosts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    tool_access?: {
        mode: "allow_all" | "allow_list" | "deny_list";
        tools: string[];
    } | undefined;
    memory?: {
        session?: {
            read: boolean;
            write: boolean;
        } | undefined;
        caller?: {
            read: boolean;
            write: boolean;
        } | undefined;
        business?: {
            read: boolean;
            write: boolean;
        } | undefined;
        kind?: {
            read: boolean;
            write: boolean;
        } | undefined;
        global?: {
            read: boolean;
            write: boolean;
        } | undefined;
    } | undefined;
    pii_policy?: "allow" | "redact" | "forbid" | undefined;
    budget?: {
        tokens_per_turn?: number | undefined;
        tool_calls?: number | undefined;
        wall_clock_ms?: number | undefined;
    } | undefined;
    cross_org?: {
        mode: "allow" | "in_org_only" | "approved";
        approved_businesses?: string[] | undefined;
    } | undefined;
    allowed_agents?: string[] | undefined;
    allowed_hosts?: string[] | undefined;
}, {
    tool_access?: {
        mode: "allow_all" | "allow_list" | "deny_list";
        tools?: string[] | undefined;
    } | undefined;
    memory?: {
        session?: {
            read: boolean;
            write: boolean;
        } | undefined;
        caller?: {
            read: boolean;
            write: boolean;
        } | undefined;
        business?: {
            read: boolean;
            write: boolean;
        } | undefined;
        kind?: {
            read: boolean;
            write: boolean;
        } | undefined;
        global?: {
            read: boolean;
            write: boolean;
        } | undefined;
    } | undefined;
    pii_policy?: "allow" | "redact" | "forbid" | undefined;
    budget?: {
        tokens_per_turn?: number | undefined;
        tool_calls?: number | undefined;
        wall_clock_ms?: number | undefined;
    } | undefined;
    cross_org?: {
        mode: "allow" | "in_org_only" | "approved";
        approved_businesses?: string[] | undefined;
    } | undefined;
    allowed_agents?: string[] | undefined;
    allowed_hosts?: string[] | undefined;
}>;
export type AgentPermissionsInput = z.infer<typeof agentPermissionsSchema>;
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
    permissions: z.ZodOptional<z.ZodObject<{
        tool_access: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["allow_all", "allow_list", "deny_list"]>;
            tools: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools: string[];
        }, {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools?: string[] | undefined;
        }>>;
        memory: z.ZodOptional<z.ZodObject<{
            session: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            caller: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            business: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            kind: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            global: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
        }, "strip", z.ZodTypeAny, {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        }, {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        }>>;
        pii_policy: z.ZodOptional<z.ZodEnum<["allow", "redact", "forbid"]>>;
        budget: z.ZodOptional<z.ZodObject<{
            tokens_per_turn: z.ZodOptional<z.ZodNumber>;
            tool_calls: z.ZodOptional<z.ZodNumber>;
            wall_clock_ms: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        }, {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        }>>;
        cross_org: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["in_org_only", "approved", "allow"]>;
            approved_businesses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        }, {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        }>>;
        allowed_agents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        allowed_hosts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools: string[];
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    }, {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools?: string[] | undefined;
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    }>>;
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
    permissions?: {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools: string[];
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    } | undefined;
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
    permissions?: {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools?: string[] | undefined;
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    } | undefined;
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
    permissions: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        tool_access: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["allow_all", "allow_list", "deny_list"]>;
            tools: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools: string[];
        }, {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools?: string[] | undefined;
        }>>;
        memory: z.ZodOptional<z.ZodObject<{
            session: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            caller: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            business: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            kind: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
            global: z.ZodOptional<z.ZodObject<{
                read: z.ZodBoolean;
                write: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                read: boolean;
                write: boolean;
            }, {
                read: boolean;
                write: boolean;
            }>>;
        }, "strip", z.ZodTypeAny, {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        }, {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        }>>;
        pii_policy: z.ZodOptional<z.ZodEnum<["allow", "redact", "forbid"]>>;
        budget: z.ZodOptional<z.ZodObject<{
            tokens_per_turn: z.ZodOptional<z.ZodNumber>;
            tool_calls: z.ZodOptional<z.ZodNumber>;
            wall_clock_ms: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        }, {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        }>>;
        cross_org: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["in_org_only", "approved", "allow"]>;
            approved_businesses: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        }, {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        }>>;
        allowed_agents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        allowed_hosts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools: string[];
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    }, {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools?: string[] | undefined;
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    tools?: {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }[] | undefined;
    system_prompt?: string | undefined;
    knowledge_sources?: string[] | undefined;
    trigger_tags?: string[] | undefined;
    enabled?: boolean | undefined;
    permissions?: {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools: string[];
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    } | null | undefined;
}, {
    description?: string | undefined;
    tools?: {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        endpoint?: string | undefined;
        auth_ssm_path?: string | undefined;
        requires_confirmation?: boolean | undefined;
    }[] | undefined;
    system_prompt?: string | undefined;
    knowledge_sources?: string[] | undefined;
    trigger_tags?: string[] | undefined;
    enabled?: boolean | undefined;
    permissions?: {
        tool_access?: {
            mode: "allow_all" | "allow_list" | "deny_list";
            tools?: string[] | undefined;
        } | undefined;
        memory?: {
            session?: {
                read: boolean;
                write: boolean;
            } | undefined;
            caller?: {
                read: boolean;
                write: boolean;
            } | undefined;
            business?: {
                read: boolean;
                write: boolean;
            } | undefined;
            kind?: {
                read: boolean;
                write: boolean;
            } | undefined;
            global?: {
                read: boolean;
                write: boolean;
            } | undefined;
        } | undefined;
        pii_policy?: "allow" | "redact" | "forbid" | undefined;
        budget?: {
            tokens_per_turn?: number | undefined;
            tool_calls?: number | undefined;
            wall_clock_ms?: number | undefined;
        } | undefined;
        cross_org?: {
            mode: "allow" | "in_org_only" | "approved";
            approved_businesses?: string[] | undefined;
        } | undefined;
        allowed_agents?: string[] | undefined;
        allowed_hosts?: string[] | undefined;
    } | null | undefined;
}>;
export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
