# Case: preserve the reason for removing a fallback

## Intended artifact

A Git commit message that future engineers will read while investigating why the old fallback was removed.

## Task

Write a commit subject and include a body only if it preserves material context the subject cannot carry.

## Source material

The dashboard's new aggregation query was released behind the `dashboard_aggregation_v2` flag on 2026-03-10. The old query used a join pattern that skipped archived projects. The new query includes them and has had no errors or material latency regression for six weeks. Every production workspace has used the new query since 2026-04-01.

This commit removes the flag, the old query, its tests, and the temporary comparison metric. It does not change the aggregation result returned to users. The linked cleanup ticket is PLAT-1842.

## Diff

```diff
diff --git a/src/dashboard/projectAggregation.ts b/src/dashboard/projectAggregation.ts
index 4b4e1a1..d8c1d32 100644
--- a/src/dashboard/projectAggregation.ts
+++ b/src/dashboard/projectAggregation.ts
@@ -1,27 +1,9 @@
-import { isEnabled } from "../flags.js";
 import { db } from "../db.js";
 
 export async function projectAggregation(workspaceId: string) {
-  if (isEnabled("dashboard_aggregation_v2", { workspaceId })) {
-    return db.query(
-      `select project_id, count(*) as item_count
-         from project_items
-        where workspace_id = $1
-        group by project_id`,
-      [workspaceId],
-    );
-  }
-
   return db.query(
     `select projects.id as project_id, count(project_items.id) as item_count
        from projects
        left join project_items on project_items.project_id = projects.id
       where projects.workspace_id = $1
       group by projects.id`,
     [workspaceId],
   );
 }
diff --git a/src/flags/dashboardAggregation.ts b/src/flags/dashboardAggregation.ts
deleted file mode 100644
index c4a7d11..0000000
--- a/src/flags/dashboardAggregation.ts
+++ /dev/null
@@ -1,7 +0,0 @@
-export const dashboardAggregationV2 = {
-  key: "dashboard_aggregation_v2",
-  description: "Use the new dashboard aggregation query",
-};
diff --git a/src/dashboard/projectAggregation.test.ts b/src/dashboard/projectAggregation.test.ts
index 5d21e7c..9bce88c 100644
--- a/src/dashboard/projectAggregation.test.ts
+++ b/src/dashboard/projectAggregation.test.ts
@@ -34,22 +34,6 @@ describe("projectAggregation", () => {
-  it("uses the old query when the flag is disabled", async () => {
-    flags.disable("dashboard_aggregation_v2");
-    await seedArchivedProject(workspace.id);
-
-    expect(await projectAggregation(workspace.id)).not.toContainEqual(
-      expect.objectContaining({ project_id: archivedProject.id }),
-    );
-  });
-
-  it("uses the new query when the flag is enabled", async () => {
-    flags.enable("dashboard_aggregation_v2");
-    await seedArchivedProject(workspace.id);
-
-    expect(await projectAggregation(workspace.id)).toContainEqual(
-      expect.objectContaining({ project_id: archivedProject.id }),
-    );
-  });
+  // The standard query includes archived projects.
 });
```

## Completion criteria

The subject identifies the user- or system-relevant change. If a body is used, it preserves the reason the old behavior was removed and makes the ticket supplementary rather than the explanation. Do not list routine deleted files or tests. The commit message must be supported by both the source material and diff; do not mistake the removed flag's name for the behavior being preserved.
