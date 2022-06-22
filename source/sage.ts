interface SageOptions {
  url: string;
}

export class Sage{
  private options: SageOptions;

  constructor(options: SageOptions) {
    this.options = options;
  }
}