export class Music {
  constructor(
    private id: string,
    private name: string,
    private artist: string,
    private minutes: number,
  ){}

  public getId(): string {
    return this.id
  }
  public setId(value: string): void {
    this.id = value
  }
  public getName(): string {
    return this.name
  }
  public setName(value: string): void {
    this.name = value
  }
  public getArtist(): string {
    return this.artist
  }
  public setArtist(value: string): void {
    this.artist = value
  }
  public getMinutes(): number {
    return this.minutes
  }
  public setMinutes(value: number): void {
    this.minutes = value
  }

}