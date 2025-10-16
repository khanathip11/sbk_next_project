export interface IssuePermissionRule {
    roleGroup: string;
    role: string;
    organizationUnit: "สบข" | "ศูนย์" | "ภาค" | "จังหวัด";
    actions: ("view" | "approve" | "update" | "all")[];
}

export const issuePermissionMatrix: IssuePermissionRule[] = [
    {
        roleGroup: "admin",
        role: "admin",
        organizationUnit: "สบข",
        actions: ["all"],
    },
    {
        roleGroup: "operator",
        role: "operator-view-approve",
        organizationUnit: "ศูนย์",
        actions: ["view", "approve"],
    },
    {
        roleGroup: "operator",
        role: "operator-view",
        organizationUnit: "ภาค",
        actions: ["view"],
    },
    {
        roleGroup: "operator",
        role: "operator-view-update",
        organizationUnit: "จังหวัด",
        actions: ["view", "update"],
    },
];
