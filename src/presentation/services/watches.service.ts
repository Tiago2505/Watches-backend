import { prisma } from "../../config";
import { CreateWatchDto, CustomError, UpdateWatchDto, WatchEntity } from "../../domain";

export class WatchesService {

  public async createWatch( createWatchDto: CreateWatchDto, ): Promise<WatchEntity> {
    
    const newWatch = await prisma.watch.create({
      data: createWatchDto,
    });

    return newWatch;
  }


  public async getAllWatches(): Promise<WatchEntity[]> {
    const watches = await prisma.watch.findMany();

    return watches;
  }


  public async getWatchById(id: number): Promise<WatchEntity> {
    const watch = await prisma.watch.findUnique({
      where: { id: id },
    });

    if (!watch) throw CustomError.notFound(`Watch with id ${id} not found`)

    return watch;
  }


  public async updateWatch( updateWatchDto: UpdateWatchDto ): Promise<WatchEntity> {

    await this.getWatchById(updateWatchDto.id);

    const watchUpdated = await prisma.watch.update({
      where: { id: updateWatchDto.id },
      data: updateWatchDto,
    });

    return watchUpdated;
  }


  public async deleteWatch(id: number): Promise<WatchEntity> {

    await this.getWatchById(id);

    const watchDeleted = await prisma.watch.delete({
      where: { id: id },
    });

    return watchDeleted;
  }

  public async searchWatchesByParam(param: string ): Promise<WatchEntity | WatchEntity[]> {
    const watches = await prisma.watch.findMany({
      where: {
        OR: [
          {
            name: {
              contains: param,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: param,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: param,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return watches;
  }
}
