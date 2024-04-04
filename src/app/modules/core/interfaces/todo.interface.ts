export interface TodoStep {
  id: number;
  name: string;
  isCompleteted: boolean;
}
export interface Todo {
  id: number;
  name: string;
  isCompleteted: boolean;
  creationDate: Date;
  plannedDate: Date | null;
  completionData: Date | null;
  isImportant: boolean;
  steps: TodoStep[];
  isTodayDay: boolean;
  user_id: number;
}
