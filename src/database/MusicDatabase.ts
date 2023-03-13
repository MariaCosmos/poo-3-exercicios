import { MusicDB } from './../types';
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {
  public static TABLE_MUSICS = "musics"

  public async findMusics() {
    const musicsDB: MusicDB[] = await BaseDatabase
      .connection(MusicDatabase.TABLE_MUSICS)
    return musicsDB
  }

  public async insertMusic(newMusic: MusicDB) {
    await BaseDatabase.connection(MusicDatabase.TABLE_MUSICS)
      .insert(newMusic)
  }

  public async findMusicById(id: string) {
    const [musicDB]: MusicDB[] | undefined[] = await BaseDatabase
      .connection(MusicDatabase.TABLE_MUSICS)
      .where({ id })

    return musicDB
  }

  public async updateMusicById(id: string, newMusic: any){
    const {newId, newName, newArtist, newMinutes} = newMusic
    await BaseDatabase
    .connection(MusicDatabase.TABLE_MUSICS)
    .update({id: newId, name: newName, artist: newArtist, minutes: newMinutes})
    .where({ id })
  }

}