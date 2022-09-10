export interface Request {}

export interface ICharactersRequest extends Request {
  name?: string;
  offset: number;
  limit: number;
}
