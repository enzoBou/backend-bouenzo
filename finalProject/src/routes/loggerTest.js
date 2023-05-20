import { Router } from "express";

const router = Router();

router.get("/fatal", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.fatal(`Petición GET recibida en FATAL ${error.message}`);
    }
    res.send("¡Hola mundo FATAL!");
});

router.get("/error", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.error(`Petición GET recibida en ERROR ${error.message}`);
    }
    res.send("¡Hola mundo ERROR!");
});

router.get("/warning", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.warning(`Petición GET recibida en WARNING ${error.message}`);
    }
    res.send("¡Hola mundo WARNING!");
});

router.get("/info", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.info(`Petición GET recibida en INFO ${error.message}`);
    }
    res.send("¡Hola mundo INFO!");
});

router.get("/http", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.http(`Petición GET recibida en HTTP ${error.message}`);
    }
    res.send("¡Hola mundo HTTP!");
});

router.get("/verbose", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.verbose(`Petición GET recibida en VERBOSE ${error.message}`);
    }
    res.send("¡Hola mundo VERBOSE!");
});

router.get("/debug", (req, res) => {
    try {
      throw new Error("Error en GET HORRIBLE, NOS TUMBA LA API 2");
    } catch (error) {
      req.logger.debug(`Petición GET recibida en DEBUG ${error.message}`);
    }
    res.send("¡Hola mundo DEBUG!");
});

export default router;
