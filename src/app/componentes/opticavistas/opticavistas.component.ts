import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { FormsModule as formsModule } from "@angular/forms"
@Component({
  selector: "app-opticavistas",
  imports: [CommonModule, formsModule],
  templateUrl: "./opticavistas.component.html",
  styleUrls: ["./opticavistas.component.css"],
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
    estadoStock: "",
    proveedor: "",
    ordenarPor: "nombre",
    orden: "asc"
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

  // Nuevas propiedades para las funcionalidades agregadas
  busquedaRapida = ""
  resultadosBusquedaRapida: any[] = []
  productoParaActualizar: any = null
  nuevoStockCantidad = 0
  motivoCambioStock = "Inventario"
  otroMotivoStock = ""

  // Propiedades para búsqueda de productos en ventas
  busquedaProductoVenta = ""
  productosEncontradosVenta: any[] = []

  // Propiedades para cálculos de venta
  calculosVenta: any = {
    subtotal: 0,
    montoDescuento: 0,
    total: 0
  }
  calculosVuelto: any = {
    vuelto: 0,
    esValido: true,
    mensajes: []
  }

  // Propiedades para descuentos verificados
  descuentosVerificados: any = null

  // Propiedades para stock
  nuevoStock: any = {}
  mostrarSoloStockBajo = false
  productosFiltrados: any[] = []

  // Propiedades para detalles de producto
  productoDetalle: any = null

  // Propiedades para previsualización
  previsualizacionComprobante: any = null

  constructor() {}

  ngOnInit() {
    this.initializeData()
    this.resetForms()
    this.aplicarFiltrosBusqueda()
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
        stockMinimo: 5
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
        stockMinimo: 3
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
        stockMinimo: 5
      },
      {
        id: 4,
        nombre: "Lentes de Contacto Acuvue",
        categoria: "Lentes de Contacto",
        precio: 3500,
        cantidad: 2,
        codigo: "AC004",
        descripcion: "Lentes de contacto diarios",
        proveedor: "Johnson & Johnson",
        stockMinimo: 10
      }
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
      stockMinimo: 5
    }

    this.nuevoEgreso = {
      tipo: "",
      motivo: "",
      monto: 0,
      descripcion: "",
    }

    this.nuevoStock = {
      codigo: "",
      nombre: "",
      categoria: "",
      precio: 0,
      cantidad: 0,
      descripcion: "",
      proveedor: "",
      stockMinimo: 5,
      motivoRegistro: "Compra",
      otroMotivo: ""
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
    if (this.clienteSeleccionado) {
      this.verificarDescuentosCliente()
    }
  }

  // Buscar productos para venta
  buscarProductosParaVenta() {
    if (this.busquedaProductoVenta.trim() === "") {
      this.productosEncontradosVenta = []
      return
    }

    this.productosEncontradosVenta = this.buscarProductoCompleto(this.busquedaProductoVenta)
  }

  agregarAlCarrito(producto: any) {
    if (producto.cantidad === 0) {
      alert("Producto sin stock disponible")
      return
    }

    const existe = this.carrito.find((p) => p.id === producto.id)
    if (existe) {
      if (existe.cantidad < producto.cantidad) {
        existe.cantidad++
      } else {
        alert("No hay suficiente stock disponible")
        return
      }
    } else {
      this.carrito.push({ ...producto, cantidad: 1 })
    }
    
    this.calcularTotalVenta()
  }

  removerDelCarrito(id: number) {
    this.carrito = this.carrito.filter((p) => p.id !== id)
    this.calcularTotalVenta()
  }

  // Métodos para manejar cantidades en el carrito
  aumentarCantidad(item: any) {
    const producto = this.productos.find(p => p.id === item.id)
    if (producto && item.cantidad < producto.cantidad) {
      item.cantidad++
      this.calcularTotalVenta()
    } else {
      alert("No hay suficiente stock disponible")
    }
  }

  disminuirCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--
      this.calcularTotalVenta()
    }
  }

  actualizarCarrito() {
    this.calcularTotalVenta()
  }

  // Verificar descuentos del cliente
  verificarDescuentosCliente() {
    if (!this.clienteSeleccionado) return

    this.descuentosVerificados = this.verificarDescuentoCompleto(
      this.clienteSeleccionado,
      this.carrito,
      this.descuentoVenta
    )
  }

  // Verificar descuento en venta
  verificarDescuentoVenta() {
    if (!this.clienteSeleccionado) {
      alert("Seleccione un cliente primero")
      return
    }

    this.descuentosVerificados = this.verificarDescuentoCompleto(
      this.clienteSeleccionado,
      this.carrito,
      this.descuentoVenta
    )

    if (!this.descuentosVerificados.esValido) {
      alert("Error en descuentos: " + this.descuentosVerificados.mensajes.join(", "))
    } else {
      this.descuentoVenta = this.descuentosVerificados.totalPorcentaje
      this.calcularTotalVenta()
    }
  }

  // Calcular total de venta
  calcularTotalVenta() {
    this.calculosVenta = this.calcularTotalCompleto(this.carrito, this.descuentoVenta)
    this.calcularVuelto()
  }

  // Calcular vuelto
  calcularVuelto() {
    if (this.montoAbonado) {
      this.calculosVuelto = this.calcularVueltoCompleto(this.calculosVenta.total, this.montoAbonado)
    }
  }

  // Previsualizar comprobante
  previsualizarComprobante() {
    if (!this.clienteSeleccionado || this.carrito.length === 0) {
      alert("Debe seleccionar un cliente y agregar productos")
      return
    }

    this.previsualizacionComprobante = {
      cliente: this.clienteSeleccionado,
      productos: this.carrito,
      calculos: this.calculosVenta,
      fecha: new Date()
    }

    this.mostrarModal("previsualizarComprobanteModal")
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
    return this.productos.filter((producto) => producto.cantidad < (producto.stockMinimo || 5)).length
  }

  getCategorias(): number {
    return new Set(this.productos.map((producto) => producto.categoria)).size
  }

  getEstadoProducto(producto: any) {
    if (producto.cantidad === 0) {
      return { text: "Sin Stock", class: "bg-danger" }
    } else if (producto.cantidad < (producto.stockMinimo || 5)) {
      return { text: "Stock Bajo", class: "bg-warning" }
    } else {
      return { text: "Disponible", class: "bg-success" }
    }
  }

  // Filtrar productos para stock
  getProductosFiltradosStock() {
    if (this.mostrarSoloStockBajo) {
      return this.productos.filter(p => p.cantidad < (p.stockMinimo || 5))
    }
    return this.productos
  }

  // Exportar inventario
  exportarInventario() {
    const contenido = `INVENTARIO - OPTICAVISTAS
Generado: ${new Date().toLocaleString()}

RESUMEN:
- Total productos: ${this.productos.length}
- Stock total: ${this.getTotalStock()}
- Productos con stock bajo: ${this.getStockBajo()}

DETALLE:
${this.productos.map(p => 
  `${p.codigo} | ${p.nombre} | ${p.categoria} | Stock: ${p.cantidad} | Precio: $${p.precio}`
).join('\n')}
`

    const blob = new Blob([contenido], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inventario-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  abrirModalProducto() {
    this.editandoProducto = false
    this.resetForms()
    this.mostrarModal("productoModal")
  }

  // Abrir modal para registrar stock
  abrirModalRegistrarStock() {
    this.resetForms()
    this.mostrarModal("registrarStockModal")
  }

  // Registrar stock completo
  registrarStockCompleto() {
    const exito = this.registrarStockCompletoValidado(this.nuevoStock)
    if (exito) {
      this.cerrarModal("registrarStockModal")
      this.resetForms()
      this.showSuccess = true
      setTimeout(() => (this.showSuccess = false), 3000)
    }
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
    this.aplicarFiltrosBusqueda()
  }

  eliminarProducto(id: number) {
    if (confirm("¿Está seguro de eliminar este producto?")) {
      this.productos = this.productos.filter((p) => p.id !== id)
      this.aplicarFiltrosBusqueda()
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

  // Aplicar filtros de búsqueda avanzada
  aplicarFiltrosBusqueda() {
    this.productosFiltrados = this.productos.filter((producto) => {
      const cumpleBusqueda =
        !this.filtros.busqueda ||
        producto.nombre.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(this.filtros.busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(this.filtros.busqueda.toLowerCase())

      const cumpleCategoria = !this.filtros.categoria || producto.categoria === this.filtros.categoria
      const cumpleProveedor = !this.filtros.proveedor || producto.proveedor === this.filtros.proveedor
      const cumplePrecioMin = !this.filtros.precioMin || producto.precio >= this.filtros.precioMin
      const cumplePrecioMax = !this.filtros.precioMax || producto.precio <= this.filtros.precioMax

      let cumpleEstadoStock = true
      if (this.filtros.estadoStock) {
        switch (this.filtros.estadoStock) {
          case 'disponible':
            cumpleEstadoStock = producto.cantidad >= (producto.stockMinimo || 5)
            break
          case 'bajo':
            cumpleEstadoStock = producto.cantidad < (producto.stockMinimo || 5) && producto.cantidad > 0
            break
          case 'agotado':
            cumpleEstadoStock = producto.cantidad === 0
            break
        }
      }

      return cumpleBusqueda && cumpleCategoria && cumpleProveedor && cumplePrecioMin && cumplePrecioMax && cumpleEstadoStock
    })

    // Ordenar resultados
    this.productosFiltrados.sort((a, b) => {
      let valorA, valorB
      
      switch (this.filtros.ordenarPor) {
        case 'precio':
          valorA = a.precio
          valorB = b.precio
          break
        case 'stock':
          valorA = a.cantidad
          valorB = b.cantidad
          break
        case 'categoria':
          valorA = a.categoria
          valorB = b.categoria
          break
        default:
          valorA = a.nombre
          valorB = b.nombre
      }

      if (this.filtros.orden === 'desc') {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0
      } else {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0
      }
    })
  }

  // Obtener proveedores únicos
  getProveedores(): string[] {
    return [...new Set(this.productos.map(p => p.proveedor).filter(p => p))]
  }

  limpiarFiltros() {
    this.filtros = {
      busqueda: "",
      categoria: "",
      precioMin: 0,
      precioMax: 0,
      estadoStock: "",
      proveedor: "",
      ordenarPor: "nombre",
      orden: "asc"
    }
    this.aplicarFiltrosBusqueda()
  }

  verDetallesProducto(producto: any) {
    this.productoDetalle = producto
    this.mostrarModal("detallesProductoModal")
  }

  verDetallesProductoCompleto(producto: any) {
    this.productoDetalle = producto
    this.mostrarModal("detallesProductoModal")
  }

  agregarAlCarritoDesdeResultados(producto: any) {
    this.agregarAlCarrito(producto)
    alert(`${producto.nombre} agregado al carrito`)
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
    if (this.clienteDescuento) {
      this.verificarDescuentosCompleto()
    }
  }

  // Verificar descuentos completo
  verificarDescuentosCompleto() {
    if (!this.clienteDescuento) return

    this.descuentosVerificados = this.verificarDescuentoCompleto(
      this.clienteDescuento,
      this.carritoDescuento,
      this.descuentoManual
    )
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

  // Métodos adicionales para funcionalidades específicas

  // Buscar producto mejorado
  buscarProductoPorCodigo(codigo: string): any {
    return this.productos.find((p) => p.codigo.toLowerCase() === codigo.toLowerCase())
  }

  buscarProductoPorNombre(nombre: string): any[] {
    return this.productos.filter((p) => p.nombre.toLowerCase().includes(nombre.toLowerCase()))
  }

  buscarProductoCompleto(termino: string): any[] {
    const terminoLower = termino.toLowerCase()
    return this.productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.codigo.toLowerCase().includes(terminoLower) ||
        p.categoria.toLowerCase().includes(terminoLower) ||
        p.descripcion.toLowerCase().includes(terminoLower),
    )
  }

  // Actualizar stock
  actualizarStock(productoId: number, nuevaCantidad: number): boolean {
    const producto = this.productos.find((p) => p.id === productoId)
    if (producto) {
      if (nuevaCantidad < 0) {
        alert("La cantidad no puede ser negativa")
        return false
      }

      const cantidadAnterior = producto.cantidad
      producto.cantidad = nuevaCantidad

      // Registrar movimiento de stock
      this.registrarMovimientoStock(producto, cantidadAnterior, nuevaCantidad, "Actualización manual")

      this.showSuccess = true
      setTimeout(() => (this.showSuccess = false), 3000)
      return true
    }
    return false
  }

  // Registrar stock mejorado
  registrarStockCompletoValidado(datosProducto: any): boolean {
    try {
      // Validaciones
      if (!this.validarDatosProducto(datosProducto)) {
        return false
      }

      // Verificar si el código ya existe
      const productoExistente = this.buscarProductoPorCodigo(datosProducto.codigo)
      if (productoExistente) {
        alert("Ya existe un producto con este código")
        return false
      }

      // Crear nuevo producto
      datosProducto.id = this.productos.length + 1
      datosProducto.fechaCreacion = new Date()
      this.productos.push({ ...datosProducto })

      // Registrar movimiento inicial
      this.registrarMovimientoStock(datosProducto, 0, datosProducto.cantidad, "Producto nuevo")

      this.aplicarFiltrosBusqueda()
      return true
    } catch (error) {
      console.error("Error al registrar stock:", error)
      alert("Error al registrar el producto")
      return false
    }
  }

  // Validar datos del producto
  validarDatosProducto(producto: any): boolean {
    if (!producto.codigo || producto.codigo.trim() === "") {
      alert("El código del producto es obligatorio")
      return false
    }

    if (!producto.nombre || producto.nombre.trim() === "") {
      alert("El nombre del producto es obligatorio")
      return false
    }

    if (!producto.categoria || producto.categoria.trim() === "") {
      alert("La categoría es obligatoria")
      return false
    }

    if (!producto.precio || producto.precio <= 0) {
      alert("El precio debe ser mayor a 0")
      return false
    }

    if (producto.cantidad < 0) {
      alert("La cantidad no puede ser negativa")
      return false
    }

    return true
  }

  // Registrar movimiento de stock
  registrarMovimientoStock(producto: any, cantidadAnterior: number, cantidadNueva: number, motivo: string) {
    const movimiento = {
      id: Date.now(),
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidadAnterior: cantidadAnterior,
      cantidadNueva: cantidadNueva,
      diferencia: cantidadNueva - cantidadAnterior,
      motivo: motivo,
      fecha: new Date(),
      usuario: this.currentUser?.username || "Sistema",
    }

    // Aquí podrías guardar en un array de movimientos si quieres llevar historial
    console.log("Movimiento de stock registrado:", movimiento)
  }

  // Calcular total mejorado
  calcularTotalCompleto(carrito: any[] = [], descuentoPorcentaje = 0, impuestos = 0): any {
    const subtotal = carrito.reduce((total, item) => {
      return total + item.precio * item.cantidad
    }, 0)

    const montoDescuento = (subtotal * descuentoPorcentaje) / 100
    const subtotalConDescuento = subtotal - montoDescuento
    const montoImpuestos = (subtotalConDescuento * impuestos) / 100
    const total = subtotalConDescuento + montoImpuestos

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      descuentoPorcentaje: descuentoPorcentaje,
      montoDescuento: Math.round(montoDescuento * 100) / 100,
      subtotalConDescuento: Math.round(subtotalConDescuento * 100) / 100,
      impuestosPorcentaje: impuestos,
      montoImpuestos: Math.round(montoImpuestos * 100) / 100,
      total: Math.round(total * 100) / 100,
      cantidadItems: carrito.reduce((total, item) => total + item.cantidad, 0),
    }
  }

  // Verificar descuento mejorado
  verificarDescuentoCompleto(cliente: any, productos: any[], descuentoManual = 0): any {
    const descuentos = {
      automaticosPorcentaje: 0,
      automaticosMotivos: [] as string[],
      manualPorcentaje: descuentoManual,
      totalPorcentaje: 0,
      esValido: true,
      mensajes: [] as string[],
    }

    if (!cliente) {
      descuentos.esValido = false
      descuentos.mensajes.push("Cliente requerido para aplicar descuentos")
      return descuentos
    }

    // Descuentos automáticos
    if (cliente.esJubilado) {
      descuentos.automaticosPorcentaje += 15
      descuentos.automaticosMotivos.push("Jubilado/Pensionado (15%)")
    }

    if (cliente.tieneDiscapacidad) {
      descuentos.automaticosPorcentaje += 20
      descuentos.automaticosMotivos.push("Persona con discapacidad (20%)")
    }

    if (this.esClienteFrecuente(cliente)) {
      descuentos.automaticosPorcentaje += 5
      descuentos.automaticosMotivos.push("Cliente frecuente (5%)")
    }

    // Descuento por volumen de compra
    const totalItems = productos.reduce((total, item) => total + item.cantidad, 0)
    if (totalItems >= 3) {
      descuentos.automaticosPorcentaje += 5
      descuentos.automaticosMotivos.push("Compra por volumen (5%)")
    }

    // Validar descuento manual
    if (descuentoManual < 0 || descuentoManual > 50) {
      descuentos.esValido = false
      descuentos.mensajes.push("El descuento manual debe estar entre 0% y 50%")
    }

    // Calcular descuento total (tomar el mayor entre automático y manual)
    descuentos.totalPorcentaje = Math.max(descuentos.automaticosPorcentaje, descuentoManual)

    // Límite máximo de descuento
    if (descuentos.totalPorcentaje > 50) {
      descuentos.totalPorcentaje = 50
      descuentos.mensajes.push("Descuento limitado al máximo permitido (50%)")
    }

    return descuentos
  }

  // Calcular vuelto mejorado
  calcularVueltoCompleto(total: number, montoPagado: number, metodoPago = "efectivo"): any {
    const resultado = {
      total: Math.round(total * 100) / 100,
      montoPagado: Math.round(montoPagado * 100) / 100,
      vuelto: 0,
      esValido: true,
      mensajes: [] as string[],
      metodoPago: metodoPago,
    }

    // Validaciones
    if (montoPagado < 0) {
      resultado.esValido = false
      resultado.mensajes.push("El monto pagado no puede ser negativo")
      return resultado
    }

    if (montoPagado < total) {
      resultado.esValido = false
      resultado.mensajes.push("El monto pagado es insuficiente")
      return resultado
    }

    // Calcular vuelto
    resultado.vuelto = Math.round((montoPagado - total) * 100) / 100

    // Validaciones específicas por método de pago
    if (metodoPago === "tarjeta" && resultado.vuelto > 0) {
      resultado.mensajes.push("Nota: Vuelto en efectivo para pago con tarjeta")
    }

    if (metodoPago === "efectivo" && resultado.vuelto > 0) {
      // Sugerir denominaciones para el vuelto
      resultado.mensajes.push(this.sugerirDenominaciones(resultado.vuelto))
    }

    return resultado
  }

  // Sugerir denominaciones para el vuelto
  sugerirDenominaciones(vuelto: number): string {
    const denominaciones = [1000, 500, 100, 50, 20, 10, 5, 1]
    let montoRestante = Math.round(vuelto)
    const billetes: any = {}

    for (const denom of denominaciones) {
      if (montoRestante >= denom) {
        billetes[denom] = Math.floor(montoRestante / denom)
        montoRestante = montoRestante % denom
      }
    }

    const sugerencia = Object.entries(billetes)
      .map(([denom, cant]) => `$${denom}: ${cant}`)
      .join(", ")

    return `Sugerencia de vuelto: ${sugerencia}`
  }

  // Generar comprobante mejorado
  generarComprobanteCompleto(datosVenta: any): any {
    try {
      const comprobante = {
        // Información básica
        numero: this.generarNumeroComprobante(),
        fecha: new Date(),
        tipo: "TICKET DE VENTA",

        // Información del negocio
        negocio: {
          nombre: "OPTICAVISTAS",
          direccion: "Av. Principal 123",
          telefono: "(011) 4567-8900",
          email: "info@opticavistas.com",
          cuit: "20-12345678-9",
        },

        // Información del cliente
        cliente: {
          nombre: `${datosVenta.cliente.nombre} ${datosVenta.cliente.apellido}`,
          dni: datosVenta.cliente.dni,
          telefono: datosVenta.cliente.telefono || "No especificado",
          esJubilado: datosVenta.cliente.esJubilado,
          tieneDiscapacidad: datosVenta.cliente.tieneDiscapacidad,
        },

        // Productos
        productos: datosVenta.productos.map((item: any) => ({
          codigo: item.codigo || "N/A",
          nombre: item.nombre,
          cantidad: item.cantidad,
          precioUnitario: item.precio,
          subtotal: item.precio * item.cantidad,
        })),

        // Cálculos
        calculos: this.calcularTotalCompleto(datosVenta.productos, datosVenta.descuento || 0),

        // Información de pago
        pago: {
          metodoPago: datosVenta.metodoPago || "efectivo",
          montoPagado: datosVenta.montoAbonado,
          vuelto: datosVenta.vuelto || 0,
        },

        // Descuentos aplicados
        descuentos: datosVenta.descuentosDetalle || [],

        // Información adicional
        vendedor: this.currentUser?.username || "Sistema",
        observaciones: datosVenta.observaciones || "",

        // Códigos de validación
        codigoQR: this.generarCodigoQR(datosVenta),
        hash: this.generarHashComprobante(datosVenta),
      }

      // Guardar en historial de comprobantes
      this.guardarComprobanteEnHistorial(comprobante)

      return comprobante
    } catch (error) {
      console.error("Error al generar comprobante:", error)
      throw new Error("No se pudo generar el comprobante")
    }
  }

  // Generar número de comprobante
  generarNumeroComprobante(): string {
    const fecha = new Date()
    const año = fecha.getFullYear().toString().slice(-2)
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const dia = fecha.getDate().toString().padStart(2, "0")
    const numeroSecuencial = (this.ventas.length + 1).toString().padStart(4, "0")

    return `${año}${mes}${dia}-${numeroSecuencial}`
  }

  // Generar código QR (simulado)
  generarCodigoQR(datosVenta: any): string {
    const datos = {
      numero: datosVenta.numero,
      fecha: datosVenta.fecha,
      total: datosVenta.total,
      cliente: datosVenta.cliente.dni,
    }

    // En una implementación real, aquí generarías un QR real
    return btoa(JSON.stringify(datos))
  }

  // Generar hash del comprobante
  generarHashComprobante(datosVenta: any): string {
    const cadena = `${datosVenta.numero}${datosVenta.fecha}${datosVenta.total}${datosVenta.cliente.dni}`

    // Hash simple (en producción usar una librería de hash real)
    let hash = 0
    for (let i = 0; i < cadena.length; i++) {
      const char = cadena.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convertir a 32bit integer
    }

    return Math.abs(hash).toString(16)
  }

  // Guardar comprobante en historial
  guardarComprobanteEnHistorial(comprobante: any) {
    // Aquí podrías guardar en localStorage o enviar a un servidor
    const historial = JSON.parse(localStorage.getItem("historialComprobantes") || "[]")
    historial.push(comprobante)
    localStorage.setItem("historialComprobantes", JSON.stringify(historial))
  }

  // Imprimir comprobante mejorado
  imprimirComprobanteCompleto(comprobante: any) {
    const ventanaImpresion = window.open("", "_blank", "width=300,height=600")

    if (ventanaImpresion) {
      ventanaImpresion.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Comprobante - ${comprobante.numero}</title>
        <style>
          body { font-family: 'Courier New', monospace; font-size: 12px; margin: 10px; }
          .centro { text-align: center; }
          .derecha { text-align: right; }
          .linea { border-bottom: 1px dashed #000; margin: 5px 0; }
          .negrita { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 2px; }
        </style>
      </head>
      <body>
        <div class="centro negrita">
          ${comprobante.negocio.nombre}<br>
          ${comprobante.negocio.direccion}<br>
          Tel: ${comprobante.negocio.telefono}<br>
          CUIT: ${comprobante.negocio.cuit}
        </div>
        
        <div class="linea"></div>
        
        <div class="centro negrita">
          ${comprobante.tipo}<br>
          N° ${comprobante.numero}
        </div>
        
        <div class="linea"></div>
        
        <div>
          <strong>Fecha:</strong> ${new Date(comprobante.fecha).toLocaleString()}<br>
          <strong>Cliente:</strong> ${comprobante.cliente.nombre}<br>
          <strong>DNI:</strong> ${comprobante.cliente.dni}<br>
          <strong>Vendedor:</strong> ${comprobante.vendedor}
        </div>
        
        <div class="linea"></div>
        
        <table>
          <tr>
            <td class="negrita">Producto</td>
            <td class="negrita centro">Cant</td>
            <td class="negrita derecha">Precio</td>
            <td class="negrita derecha">Total</td>
          </tr>
          ${comprobante.productos
            .map(
              (item: any) => `
            <tr>
              <td>${item.nombre}</td>
              <td class="centro">${item.cantidad}</td>
              <td class="derecha">$${item.precioUnitario.toLocaleString()}</td>
              <td class="derecha">$${item.subtotal.toLocaleString()}</td>
            </tr>
          `,
            )
            .join("")}
        </table>
        
        <div class="linea"></div>
        
        <div class="derecha">
          Subtotal: $${comprobante.calculos.subtotal.toLocaleString()}<br>
          ${
            comprobante.calculos.montoDescuento > 0
              ? `Descuento (${comprobante.calculos.descuentoPorcentaje}%): -$${comprobante.calculos.montoDescuento.toLocaleString()}<br>`
              : ""
          }
          <strong>TOTAL: $${comprobante.calculos.total.toLocaleString()}</strong><br>
          Pagado: $${comprobante.pago.montoPagado.toLocaleString()}<br>
          ${comprobante.pago.vuelto > 0 ? `Vuelto: $${comprobante.pago.vuelto.toLocaleString()}<br>` : ""}
        </div>
        
        <div class="linea"></div>
        
        <div class="centro">
          ¡Gracias por su compra!<br>
          Conserve este comprobante<br>
          <small>Hash: ${comprobante.hash}</small>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 1000);
          }
        </script>
      </body>
      </html>
    `)

      ventanaImpresion.document.close()
    }
  }

  // Actualizar el método procesarVenta para usar las nuevas funcionalidades
  procesarVentaCompleta() {
    try {
      // Verificar descuentos
      const verificacionDescuento = this.verificarDescuentoCompleto(
        this.clienteSeleccionado,
        this.carrito,
        this.descuentoVenta,
      )

      if (!verificacionDescuento.esValido) {
        alert("Error en descuentos: " + verificacionDescuento.mensajes.join(", "))
        return
      }

      // Calcular totales
      const calculos = this.calcularTotalCompleto(this.carrito, verificacionDescuento.totalPorcentaje)

      // Verificar vuelto
      const verificacionVuelto = this.calcularVueltoCompleto(calculos.total, this.montoAbonado)

      if (!verificacionVuelto.esValido) {
        alert("Error en el pago: " + verificacionVuelto.mensajes.join(", "))
        return
      }

      // Crear datos de la venta
      const datosVenta = {
        id: this.ventas.length + 1,
        numero: this.generarNumeroComprobante(),
        fecha: new Date(),
        cliente: this.clienteSeleccionado,
        productos: [...this.carrito],
        descuento: verificacionDescuento.totalPorcentaje,
        descuentosDetalle: verificacionDescuento.automaticosMotivos,
        subtotal: calculos.subtotal,
        total: calculos.total,
        montoAbonado: this.montoAbonado,
        vuelto: verificacionVuelto.vuelto,
        metodoPago: "efectivo", // Podrías agregar un selector
        estado: "Completada",
        vendedor: this.currentUser?.username,
      }

      // Generar comprobante
      const comprobante = this.generarComprobanteCompleto(datosVenta)

      // Guardar venta
      this.ventas.push(datosVenta)
      this.comprobanteVenta = comprobante

      // Actualizar stock
      this.carrito.forEach((item) => {
        const producto = this.productos.find((p) => p.id === item.id)
        if (producto) {
          this.actualizarStock(producto.id, producto.cantidad - item.cantidad)
        }
      })

      // Limpiar formulario
      this.carrito = []
      this.clienteSeleccionado = null
      this.searchDni = ""
      this.descuentoVenta = 0
      this.montoAbonado = 0
      this.calculosVenta = { subtotal: 0, montoDescuento: 0, total: 0 }
      this.calculosVuelto = { vuelto: 0, esValido: true, mensajes: [] }

      // Mostrar comprobante
      this.mostrarModal("comprobanteModal")

      // Mostrar mensaje de éxito
      alert("Venta procesada exitosamente")
    } catch (error) {
      console.error("Error al procesar venta:", error)
      alert("Error al procesar la venta. Intente nuevamente.")
    }
  }

  // Búsqueda rápida
  realizarBusquedaRapida() {
    if (this.busquedaRapida.trim() === "") {
      this.resultadosBusquedaRapida = []
      return
    }

    this.resultadosBusquedaRapida = this.buscarProductoCompleto(this.busquedaRapida)
  }

  limpiarBusquedaRapida() {
    this.busquedaRapida = ""
    this.resultadosBusquedaRapida = []
  }

  // Modal de actualizar stock
  abrirModalActualizarStock(producto: any) {
    this.productoParaActualizar = producto
    this.nuevoStockCantidad = producto.cantidad
    this.motivoCambioStock = "Inventario"
    this.otroMotivoStock = ""
    this.mostrarModal("actualizarStockModal")
  }

  confirmarActualizacionStock() {
    if (!this.productoParaActualizar) return

    const motivo = this.motivoCambioStock === "Otro" ? this.otroMotivoStock : this.motivoCambioStock

    if (this.actualizarStock(this.productoParaActualizar.id, this.nuevoStockCantidad)) {
      this.cerrarModal("actualizarStockModal")

      // Actualizar la búsqueda si está activa
      if (this.busquedaRapida.trim() !== "") {
        this.realizarBusquedaRapida()
      }

      // Actualizar filtros de búsqueda
      this.aplicarFiltrosBusqueda()
    }
  }

  // Enviar comprobante por email (simulado)
  enviarComprobantePorEmail() {
    if (!this.comprobanteVenta) return

    const email = prompt("Ingrese el email del cliente:")
    if (email) {
      // Aquí implementarías el envío real del email
      alert(`Comprobante enviado a ${email} (simulado)`)
    }
  }
}
