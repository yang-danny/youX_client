import {z} from "zod";

export const applicationSchema = z.object({
    user:z.string().min(1,"User is required"),
    type:z.string().min(1,"Type should be select"),
    provider:z.string().min(1,"Provider should be select"),
    amount: z.coerce.number().min(0.1,"Amount must larger than 0"),
    income: z.coerce.number().min(0.1,"Income must larger than 0"),
    expenses: z.coerce.number().min(0.1,"Expenses must larger than 0"),
    assets: z.coerce.number().min(0.1,"Amount must larger than 0"),
    liabilities: z.coerce.number().min(0.1,"Liabilities must larger than 0"),
    description: z.string(),
    status:z.string().min(1,"Status should be select"),
});

export type ApplicationCreateState = z.infer<typeof applicationSchema>;
