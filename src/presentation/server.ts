import express, { Router } from "express";
import path from "path";
import cors from "cors";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;

    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    const allowedOrigins = [
      "http://localhost:4200",
      "https://mobilize-mutation-aftermath.ngrok-free.dev",
      "https://1qjdq8c9-4200.use2.devtunnels.ms",
      "https://unique-sprite-9ff5bf.netlify.app",
      "https://api.dcprograming.com"
    ];

    this.app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      }),
    );

    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    this.app.use(express.static(this.publicPath));

    this.app.use(this.routes);

    this.app.use((req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`,
      );

      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}
