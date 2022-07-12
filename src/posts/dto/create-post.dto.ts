export class CreatePostDto {
  //лучше id доставвать из токена
  readonly userId: number;
  readonly title: string;
  readonly content: string;
}
