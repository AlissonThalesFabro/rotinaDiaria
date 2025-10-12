interface ActivityCompletion {
    activityId: number;
    completedAt: string;
}

const STORAGE_KEY = 'activity_completions';

export const CompletionService = {
    getCompletions(): ActivityCompletion[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    completeActivity(activityId: number): void {
        const completions = this.getCompletions();
        completions.push({
            activityId,
            completedAt: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completions));
    },

    isCompletedToday(activityId: number): boolean {
        const today = new Date().toDateString();
        return this.getCompletions().some(completion => {
            const completionDate = new Date(completion.completedAt).toDateString();
            return completion.activityId === activityId && completionDate === today;
        });
    }
};
