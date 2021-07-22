export interface LogErrorRepository {
  log: (stack: string) => Promise<any>
}
