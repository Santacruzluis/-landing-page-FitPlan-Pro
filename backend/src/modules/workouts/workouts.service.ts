import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkoutsService {
  // Servicio simplificado que no usa base de datos
  // Solo para mantener la estructura del módulo

  async test() {
    return {
      message: "Workouts service is working!",
      timestamp: new Date().toISOString(),
    };
  }

  async findAllSessions(): Promise<any[]> {
    // Simular que no hay datos en la base de datos
    console.log("Simulando que no hay datos en la base de datos");
    throw new Error("No hay datos en la base de datos");
  }
}
