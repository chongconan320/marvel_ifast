export interface Request {}

export interface ICharactersRequest extends Request {
  name?: string;
  nameStartsWith?: string;
  offset: number;
  limit: number;
}
