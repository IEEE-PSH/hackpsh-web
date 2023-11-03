export class BaseError {
  public readonly title: string;
  public readonly description?: string | null;

  constructor(opts: { error_title: string; error_desc: string | null }) {
    this.title = opts.error_title;
    this.description = "Something unexpected has occurred.";
    if (opts.error_desc) {
      this.description = opts.error_desc;
    }
  }
}
