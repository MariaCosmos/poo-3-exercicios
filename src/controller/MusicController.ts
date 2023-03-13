import { Music } from './../models/Music';
import { MusicDatabase } from './../database/MusicDatabase';
import { Request, Response } from "express"
import { MusicDB } from '../types';

export class MusicController {
  public getMusic = async (req: Request, res: Response) => {
    try {
      const musicDatabase = new MusicDatabase()
      const musicsDB: MusicDB[] = await musicDatabase.findMusics()

      const musics = musicsDB.map((musicDB) => new Music(
        musicDB.id,
        musicDB.name,
        musicDB.artist,
        musicDB.minutes
      ))

      res.status(200).send(musics)
    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }

  public postMusic = async (req: Request, res: Response) => {
    try {
      const { id, name, artist, minutes } = req.body

      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
      if (typeof name !== "string") {
        res.status(400)
        throw new Error("'name' deve ser uma string")
      }
      if (typeof artist !== "string") {
        res.status(400)
        throw new Error("'artist' deve ser uma string")
      }
      if (typeof minutes !== "number") {
        res.status(400)
        throw new Error("'minutes' deve ser um number")
      }

      const musicDatabase = new MusicDatabase()
      const musicDBExists = await musicDatabase.findMusicById(id)

      if (musicDBExists) {
        res.status(200)
        throw new Error("'id' já existe ")
      }

      const newMusic = new Music(id, name, artist, minutes)
      const newMusicDB = {
        id: newMusic.getId(),
        name: newMusic.getName(),
        artist: newMusic.getArtist(),
        minutes: newMusic.getMinutes()
      }

      await musicDatabase.insertMusic(newMusicDB)

      res.status(200).send({ message: "musica cadastrada com sucesso" })
    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }


  }

  public editMusic = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const { newId, newName, newArtist, newMinutes } = req.body

      const musicDatabase = new MusicDatabase()
      const musicDB = await musicDatabase.findMusicById(id)

      if (!musicDB) {
        res.status(400)
        throw new Error("'id' não encontrado")
      }

      const music = new Music(
        musicDB.id,
        musicDB.name,
        musicDB.artist,
        musicDB.minutes
      )

      const newMusic = {
        newId: newId,
        newName: newName,
        newArtist: newArtist,
        newMinutes: newMinutes
      }

      await musicDatabase.updateMusicById(id, newMusic)
      res.status(200).send({message: "musica atualizada com sucesso."})

    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }
}