import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opticavistas',
  imports: [CommonModule,FormsModule],
  templateUrl: './opticavistas.component.html',
  styleUrls: ['./opticavistas.component.css']
})
export class OpticavistasComponent implements OnInit {
  // Propiedades principales
  productos: any[] = []
  clientes: any[] = []
  ventas: any[] = []
  egresos: any[] = []
  carrito: any[] = []
  currentUser: any = null
  currentView = "login"

  // Login
  loginData = { username: "", password: "" }
  loginError = ""
  isLoading = false

  // Ventas
  clienteSeleccionado: any = null
  searchDni = ""
  descuentoVenta = 0
  montoAbonado = 0
  comprobanteVenta: any = null

  // Stock
  nuevoProducto: any = {}
  editandoProducto = false
  showSuccess = false

  // Búsqueda de productos
  filtros = {
    busqueda: "",
    categoria: "",
    precioMin: 0,
    precioMax: 0,
  }

  // Egresos
  nuevoEgreso: any = {}
  tiposEgreso = ["Servicios", "Compras", "Sueldos", "Alquiler", "Mantenimiento", "Marketing", "Otros"]

  // Búsqueda de ventas
  filtrosVenta = {
    nombre: "",
    apellido: "",
    dni: "",
    fechaDesde: "",
    fechaHasta: "",
  }

  // Descuentos
  clienteDescuento: any = null
  searchDniDescuento = ""
  carritoDescuento: any[] = []
  descuentoManual = 0

  // Reportes
  reporteConfig = {
    fechaDesde: "",
    fechaHasta: "",
  }
  reporteGenerado: any = null
  generandoReporte = false

  // Categorías
  categorias = ["Lentes de Sol", "Lentes Graduados", "Armazones", "Accesorios", "Lentes de Contacto"]

  constructor() {}

  ngOnInit() {
    this.initializeData()
    this.resetForms()
  }

  initializeData() {
    // Datos de ejemplo
    this.productos = [
      {
        id: 1,
        nombre: "Lentes Ray-Ban Aviator",
        categoria: "Lentes de Sol",
        precio: 15000,
        cantidad: 10,
        codigo: "RB001",
        descripcion: "Lentes de sol clásicos con protección UV",
        proveedor: "Ray-Ban Official",
      },
      {
        id: 2,
        nombre: "Armazón Oakley Sport",
        categoria: "Armazones",
        precio: 8500,
        cantidad: 5,
        codigo: "OK002",
        descripcion: "Armazón deportivo resistente",
        proveedor: "Oakley Sports",
      },
      {
        id: 3,
        nombre: "Lentes Transitions",
        categoria: "Lentes Graduados",
        precio: 12000,
        cantidad: 8,
        codigo: "TR003",
        descripcion: "Lentes fotocromáticos que se adaptan a la luz",
        proveedor: "Transitions Optical",
      },
    ]

    this.clientes = [
      {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        dni: "12345678",
        telefono: "123456789",
        esJubilado: true,
        tieneDiscapacidad: false,
        fechaUltimaCompra: "2024-01-10",
      },
      {
        id: 2,
        nombre: "María",
        apellido: "González",
        dni: "87654321",
        telefono: "987654321",
        esJubilado: false,
        tieneDiscapacidad: true,
        fechaUltimaCompra: "2024-02-15",
      },
    ]

    this.ventas = [
      {
        id: 1,
        numero: "V-001",
        fecha: new Date("2024-01-15"),
        cliente: { nombre: "Juan", apellido: "Pérez", dni: "12345678" },
        productos: [{ nombre: "Lentes Ray-Ban", cantidad: 1, precio: 15000 }],
        total: 15000,
        descuento: 0,
        estado: "Completada",
      },
      {
        id: 2,
        numero: "V-002",
        fecha: new Date("2024-01-14"),
        cliente: { nombre: "María", apellido: "González", dni: "87654321" },
        productos: [
          { nombre: "Armazón Oakley", cantidad: 1, precio: 8500 },
          { nombre: "Lentes Transitions", cantidad: 1, precio: 12000 },
        ],
        total: 18450,
        descuento: 10,
        estado: "Completada",
      },
    ]

    this.egresos = [
      {
        id: 1,
        tipo: "Servicios",
        motivo: "Pago de electricidad",
        monto: 5000,
        fecha: new Date("2024-01-15"),
        descripcion: "Factura de luz del mes de enero",
      },
      {
        id: 2,
        tipo: "Compras",
        motivo: "Compra de productos",
        monto: 25000,
        fecha: new Date("2024-01-14"),
        descripcion: "Compra de lentes Ray-Ban",
      },
    ]
  }

  resetForms() {
    this.nuevoProducto = {
      codigo: "",
      nombre: "",
      categoria: "",
      precio: 0,
      cantidad: 0,
      descripcion: "",
      proveedor: "",
    }

    this.nuevoEgreso = {
      tipo: "",
      motivo: "",
      monto: 0,
      descripcion: "",
    }
  }

  // Métodos de autenticación
  login() {
    this.isLoading = true
    this.loginError = ""

    setTimeout(() => {
      const validCredentials = [
        { username: "cajero", password: "1234", role: "cajero" },
        { username: "gerente", password: "1234", role: "gerente" },
        { username: "admin", password: "1234", role: "admin" },
      ]

      const user = validCredentials.find(
        (cred) => cred.username === this.loginData.username && cred.password === this.loginData.password,
      )

      if (user) {
        this.currentUser = user
        this.currentView = "dashboard"
      } else {
        this.loginError = "Credenciales inválidas. Intente nuevamente."
      }

      this.isLoading = false
    }, 1000)
  }

  logout() {
    this.currentUser = null
    this.currentView = "login"
    this.loginData = { username: "", password: "" }
    this.loginError = ""
  }

  // Métodos de navegación
  setView(view: string) {
    this.currentView = view
  }

  hasPermission(roles: string[]): boolean {
    return this.currentUser && roles.includes(this.currentUser.role)
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  getMenuItems() {
    const items = []

    if (this.hasPermission(["cajero", "admin"])) {
      items.push(
        {
          title: "Registrar Venta",
          description: "Procesar nueva venta y generar comprobante",
          icon: "bi-cart-plus",
          color: "success",
          view: "ventas",
        },
        {
          title: "Aplicar Descuento",
          description: "Gestionar descuentos en ventas",
          icon: "bi-percent",
          color: "warning",
          view: "descuento",
        },
        {
          title: "Buscar Ventas por Cliente",
          description: "Consultar historial de ventas",
          icon: "bi-search",
          color: "info",
          view: "buscar-ventas",
        },
        {
          title: "Registrar Egreso",
          description: "Registrar gastos y egresos",
          icon: "bi-cash-stack",
          color: "danger",
          view: "egresos",
        },
      )
    }

    if (this.hasPermission(["gerente", "admin"])) {
      items.push(
        {
          title: "Registrar Stock",
          description: "Gestionar inventario de productos",
          icon: "bi-box-seam",
          color: "primary",
          view: "stock",
        },
        {
          title: "Buscar Producto",
          description: "Consultar productos en inventario",
          icon: "bi-search",
          color: "secondary",
          view: "buscar-productos",
        },
      )
    }

    if (this.hasPermission(["admin"])) {
      items.push({
        title: "Generar Reporte",
        description: "Reportes de ventas y estadísticas",
        icon: "bi-graph-up",
        color: "dark",
        view: "reportes",
      })
    }

    return items
  }

  // Métodos de ventas
  buscarCliente() {
    const cliente = this.clientes.find((c) => c.dni === this.searchDni)
    this.clienteSeleccionado = cliente || null
  }

  agregarAlCarrito(producto: any) {
    const existe = this.carrito.find((p) => p.id === producto.id)
    if (existe) {
      existe.cantidad++
    } else {
      this.carrito.push({ ...producto, cantidad: 1 })
    }
  }

  removerDelCarrito(id: number) {
    this.carrito = this.carrito.filter((p) => p.id !== id)
  }

  calcularSubtotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
  }

  calcularDescuento(): number {
    return (this.calcularSubtotal() * this.descuentoVenta) / 100
  }

  calcularTotal(): number {
    return this.calcularSubtotal() - this.calcularDescuento()
  }

  procesarVenta() {
    const total = this.calcularTotal()

    if (this.montoAbonado < total) {
      alert("El monto abonado es insuficiente")
      return
    }

    const nuevaVenta = {
      id: this.ventas.length + 1,
      numero: `V-${String(this.ventas.length + 1).padStart(3, "0")}`,
      fecha: new Date(),
      cliente: this.clienteSeleccionado,
      productos: [...this.carrito],
      subtotal: this.calcularSubtotal(),
      descuento: this.descuentoVenta,
      total: total,
      montoAbonado: this.montoAbonado,
      vuelto: this.montoAbonado - total,
      estado: "Completada",
    }

    this.ventas.push(nuevaVenta)
    this.comprobanteVenta = nuevaVenta

    // Actualizar stock
    this.carrito.forEach((item) => {
      const producto = this.productos.find((p) => p.id === item.id)
      if (producto) {
        producto.cantidad -= item.cantidad
      }
    })

    // Limpiar formulario
    this.carrito = []
    this.clienteSeleccionado = null
    this.searchDni = ""
    this.descuentoVenta = 0
    this.montoAbonado = 0

    // Mostrar modal de comprobante
    this.mostrarModal("comprobanteModal")
  }

  // Métodos de stock
  getTotalStock(): number {
    return this.productos.reduce((total, producto) => total + producto.cantidad, 0)
  }

  getStockBajo(): number {
    return this.productos.filter((producto) => producto.cantidad < 5).length
  }

  getCategorias(): number {
    return new Set(this.productos.map((producto) => producto.categoria)).size
  }

  getEstadoProducto(producto: any) {
    if (producto.cantidad === 0) {
      return { text: "Sin Stock", class: "bg-danger" }
    } else if (producto.cantidad < 5) {
      return { text: "Stock Bajo", class: "bg-warning" }
    } else {
      return { text: "Disponible", class: "bg-success" }
    }
  }

  abrirModalProducto() {
    this.editandoProducto = false
    this.resetForms()
    this.mostrarModal("productoModal")
  }

  editarProducto(producto: any) {
    this.editandoProducto = true
    this.nuevoProducto = { ...producto }
    this.mostrarModal("productoModal")
  }

  guardarProducto() {
    if (this.editandoProducto) {
      const index = this.productos.findIndex((p) => p.id === this.nuevoProducto.id)
      if (index !== -1) {
        this.productos[index] = { ...this.nuevoProducto }
      }
    } else {
      this.nuevoProducto.id = this.productos.length + 1
      this.productos.push({ ...this.nuevoProducto })
    }

    this.resetForms()
    this.cerrarModal("productoModal")
    this.showSuccess = true
    setTimeout(() => (this.showSuccess = false), 3000)
  }

  eliminarProducto(id: number) {
    if (confirm("¿Está seguro de eliminar este producto?")) {
      this.productos = this.productos.filter((p) => p.id !== id)
    }
  }

  // Métodos de búsqueda de productos
  getProductosFiltrados() {
    return this.productos.filter((producto) => {
      const cumpleBusqueda =
        !this.filtros.busqueda ||
        producto.nombre.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(this.filtros.busqueda.toLowerCase())

      const cumpleCategoria = !this.filtros.categoria || producto.categoria === this.filtros.categoria

      const cumplePrecioMin = !this.filtros.precioMin || producto.precio >= this.filtros.precioMin
      const cumplePrecioMax = !this.filtros.precioMax || producto.precio <= this.filtros.precioMax

      return cumpleBusqueda && cumpleCategoria && cumplePrecioMin && cumplePrecioMax
    })
  }

  limpiarFiltros() {
    this.filtros = {
      busqueda: "",
      categoria: "",
      precioMin: 0,
      precioMax: 0,
    }
  }

  verDetallesProducto(producto: any) {
    console.log("Ver detalles de:", producto)
  }

  // Métodos de egresos
  registrarEgreso() {
    const nuevoEgreso = {
      id: this.egresos.length + 1,
      ...this.nuevoEgreso,
      fecha: new Date(),
    }

    this.egresos.push(nuevoEgreso)
    this.resetForms()
    this.showSuccess = true
    setTimeout(() => (this.showSuccess = false), 3000)
  }

  getTotalEgresos(): number {
    return this.egresos.reduce((total, egreso) => total + egreso.monto, 0)
  }

  getEgresosPorTipo(tipo: string): number {
    return this.egresos.filter((egreso) => egreso.tipo === tipo).reduce((total, egreso) => total + egreso.monto, 0)
  }

  getPorcentajeEgreso(tipo: string): number {
    const total = this.getTotalEgresos()
    return total > 0 ? (this.getEgresosPorTipo(tipo) / total) * 100 : 0
  }

  // Métodos de búsqueda de ventas
  getVentasFiltradas() {
    return this.ventas
      .filter((venta) => {
        const cumpleNombre =
          !this.filtrosVenta.nombre ||
          venta.cliente.nombre.toLowerCase().includes(this.filtrosVenta.nombre.toLowerCase())

        const cumpleApellido =
          !this.filtrosVenta.apellido ||
          venta.cliente.apellido.toLowerCase().includes(this.filtrosVenta.apellido.toLowerCase())

        const cumpleDni = !this.filtrosVenta.dni || venta.cliente.dni.includes(this.filtrosVenta.dni)

        const cumpleFechaDesde =
          !this.filtrosVenta.fechaDesde || new Date(venta.fecha) >= new Date(this.filtrosVenta.fechaDesde)

        const cumpleFechaHasta =
          !this.filtrosVenta.fechaHasta || new Date(venta.fecha) <= new Date(this.filtrosVenta.fechaHasta)

        return cumpleNombre && cumpleApellido && cumpleDni && cumpleFechaDesde && cumpleFechaHasta
      })
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }

  getTotalVentasFiltradas(): number {
    return this.getVentasFiltradas().reduce((total, venta) => total + venta.total, 0)
  }

  getClientesUnicos(): number {
    const ventasFiltradas = this.getVentasFiltradas()
    return new Set(ventasFiltradas.map((v) => v.cliente.dni)).size
  }

  limpiarFiltrosVenta() {
    this.filtrosVenta = {
      nombre: "",
      apellido: "",
      dni: "",
      fechaDesde: "",
      fechaHasta: "",
    }
  }

  verDetalleVenta(venta: any) {
    console.log("Ver detalle de venta:", venta)
  }

  // Métodos de descuentos
  buscarClienteDescuento() {
    const cliente = this.clientes.find((c) => c.dni === this.searchDniDescuento)
    this.clienteDescuento = cliente || null
  }

  esClienteFrecuente(cliente: any): boolean {
    const ultimaCompra = new Date(cliente.fechaUltimaCompra)
    const hoy = new Date()
    const diasDesdeUltimaCompra = Math.floor((hoy.getTime() - ultimaCompra.getTime()) / (1000 * 60 * 60 * 24))
    return diasDesdeUltimaCompra <= 30
  }

  getDescuentosAutomaticos() {
    if (!this.clienteDescuento) return { porcentaje: 0, motivos: [] }

    let descuento = 0
    const motivos: string[] = []

    if (this.clienteDescuento.esJubilado) {
      descuento += 15
      motivos.push("Jubilado/Pensionado (15%)")
    }

    if (this.clienteDescuento.tieneDiscapacidad) {
      descuento += 20
      motivos.push("Persona con discapacidad (20%)")
    }

    if (this.esClienteFrecuente(this.clienteDescuento)) {
      descuento += 5
      motivos.push("Cliente frecuente (5%)")
    }

    descuento = Math.min(descuento, 35)

    return { porcentaje: descuento, motivos }
  }

  agregarProductoDescuento(producto: any) {
    const existe = this.carritoDescuento.find((p) => p.id === producto.id)
    if (existe) {
      existe.cantidad++
    } else {
      this.carritoDescuento.push({ ...producto, cantidad: 1 })
    }
  }

  removerProductoDescuento(id: number) {
    this.carritoDescuento = this.carritoDescuento.filter((p) => p.id !== id)
  }

  calcularSubtotalDescuento(): number {
    return this.carritoDescuento.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
  }

  calcularDescuentoAutomatico(): number {
    return (this.calcularSubtotalDescuento() * this.getDescuentosAutomaticos().porcentaje) / 100
  }

  calcularDescuentoManualMonto(): number {
    return (this.calcularSubtotalDescuento() * this.descuentoManual) / 100
  }

  getDescuentoTotal(): number {
    return Math.max(this.getDescuentosAutomaticos().porcentaje, this.descuentoManual)
  }

  calcularMontoDescuentoTotal(): number {
    return (this.calcularSubtotalDescuento() * this.getDescuentoTotal()) / 100
  }

  calcularTotalConDescuento(): number {
    return this.calcularSubtotalDescuento() - this.calcularMontoDescuentoTotal()
  }

  procesarVentaConDescuento() {
    const nuevaVenta = {
      id: this.ventas.length + 1,
      numero: `V-${String(this.ventas.length + 1).padStart(3, "0")}`,
      fecha: new Date(),
      cliente: this.clienteDescuento,
      productos: [...this.carritoDescuento],
      subtotal: this.calcularSubtotalDescuento(),
      descuento: this.getDescuentoTotal(),
      total: this.calcularTotalConDescuento(),
      estado: "Completada",
    }

    this.ventas.push(nuevaVenta)

    // Actualizar stock
    this.carritoDescuento.forEach((item) => {
      const producto = this.productos.find((p) => p.id === item.id)
      if (producto) {
        producto.cantidad -= item.cantidad
      }
    })

    // Limpiar formulario
    this.carritoDescuento = []
    this.clienteDescuento = null
    this.searchDniDescuento = ""
    this.descuentoManual = 0

    alert("Venta procesada con descuento exitosamente")
  }

  // Métodos de reportes
  generarReporte() {
    this.generandoReporte = true

    setTimeout(() => {
      const ventasFiltradas = this.ventas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha)
        return (
          fechaVenta >= new Date(this.reporteConfig.fechaDesde) && fechaVenta <= new Date(this.reporteConfig.fechaHasta)
        )
      })

      const totalVentas = ventasFiltradas.length
      const totalMonto = ventasFiltradas.reduce((sum, venta) => sum + venta.total, 0)
      const totalProductos = ventasFiltradas.reduce((sum, venta) => sum + venta.productos.length, 0)
      const promedioVenta = totalVentas > 0 ? totalMonto / totalVentas : 0

      this.reporteGenerado = {
        periodo: {
          desde: this.reporteConfig.fechaDesde,
          hasta: this.reporteConfig.fechaHasta,
        },
        resumen: {
          totalVentas,
          totalMonto,
          totalProductos,
          promedioVenta: Math.round(promedioVenta),
          diasConVentas: ventasFiltradas.length,
        },
        ventasPorDia: ventasFiltradas.map((venta) => ({
          fecha: venta.fecha,
          cantidad: 1,
          total: venta.total,
          productos: venta.productos.length,
        })),
        generadoEn: new Date(),
      }

      this.generandoReporte = false
    }, 2000)
  }

  getAlturaGrafico(valor: number): number {
    if (!this.reporteGenerado) return 20
    const maxMonto = Math.max(...this.reporteGenerado.ventasPorDia.map((v: any) => v.total))
    return (valor / maxMonto) * 200
  }

  imprimirReporte() {
    window.print()
  }

  exportarReporte() {
    if (!this.reporteGenerado) return

    const contenido = `
REPORTE DE VENTAS - OPTICAVISTAS
Período: ${new Date(this.reporteGenerado.periodo.desde).toLocaleDateString()} - ${new Date(this.reporteGenerado.periodo.hasta).toLocaleDateString()}
Generado: ${this.reporteGenerado.generadoEn.toLocaleString()}

RESUMEN GENERAL:
- Total de ventas: ${this.reporteGenerado.resumen.totalVentas}
- Monto total: $${this.reporteGenerado.resumen.totalMonto.toLocaleString()}
- Productos vendidos: ${this.reporteGenerado.resumen.totalProductos}
- Promedio por venta: $${this.reporteGenerado.resumen.promedioVenta.toLocaleString()}
- Días con ventas: ${this.reporteGenerado.resumen.diasConVentas}

DETALLE POR DÍA:
${this.reporteGenerado.ventasPorDia
  .map(
    (venta: any) =>
      `${new Date(venta.fecha).toLocaleDateString()}: ${venta.cantidad} ventas - $${venta.total.toLocaleString()}`,
  )
  .join("\n")}
    `

    const blob = new Blob([contenido], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte-ventas-${this.reporteGenerado.periodo.desde}-${this.reporteGenerado.periodo.hasta}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Métodos de utilidad
  imprimirComprobante() {
    window.print()
  }

  mostrarModal(modalId: string) {
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement)
      modal.show()
    }
  }

  cerrarModal(modalId: string) {
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
    }
  }
}
