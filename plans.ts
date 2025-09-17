export type PlanKey = 'free' | 'personal' | 'pro' | 'team';
export const PLAN: Record<PlanKey, any> = {
  free:    { sources: 1,  digestsPerDay: 1, weekends: false, archiveDays: 30,  outputs: ['email'] },
  personal:{ sources: 2,  digestsPerDay: 2, weekends: true,  archiveDays: 90,  outputs: ['email','web'], prioritySenders: 20 },
  pro:     { sources: 6,  digestsPerDay: 2, weekends: true,  archiveDays: 365, outputs: ['email','web','slack','api'], vectorSearch: true },
  team:    { sources: 12, digestsPerDay: 4, weekends: true,  archiveDays: 730, outputs: ['email','web','slack','api','push'], admin: true },
};
export function canConnectAnotherSource(userPlan: PlanKey, currentSources: number){ return currentSources < PLAN[userPlan].sources; }
export function hasOutput(userPlan: PlanKey, where: 'email'|'web'|'slack'|'api'|'push'){ return (PLAN[userPlan].outputs||[]).includes(where); }
