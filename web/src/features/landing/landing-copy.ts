// Every text of the landing page, in English and Spanish (DESIGN.md: Content; #176 Languages).
// Both languages have the same keys: `es` is typed as `LandingCopy`, so a missing key fails to compile.
// Only the landing page is translated; the rest of the interface stays English.

export type LandingLanguage = 'en' | 'es'

export type DemoTag = {
  slug: string
  tenantLine: string
  name: string
  attributes: { name: string; value: string }[]
}

const en = {
  meta: {
    title: 'Just Looking: a product catalog for any business',
    description:
      'Just Looking puts your products online with photos, attributes, search and filters, and lets visitors send you inquiries. No prices, no cart.',
  },
  nav: {
    signIn: 'Sign in',
    languageGroup: 'Language',
    english: 'English',
    spanish: 'Español',
  },
  hero: {
    // The headline is split so one word can be set on the highlighter.
    headlineBefore: 'Let them look at ',
    headlineHighlight: 'everything',
    headlineAfter: ' they want.',
    lede: 'A catalog for any business: your products with photos and attributes, search and filters, and an inquiry form. Visitors browse; you answer.',
    tryDemo: 'Try the demo',
    demoNote: '3 example shops · no sign-up',
    // The pun behind the name, shown after the "Just looking" stamp.
    pun: 'What you say in a shop when you only want to browse.',
  },
  tag: {
    price: 'Price',
    stamp: 'Just looking',
    openDemo: 'Open the demo',
    // Accessible name of a demo tag link; {tenant} is replaced by the tenant name.
    openDemoName: 'Open the {tenant} demo',
  },
  demoTags: [
    {
      slug: 'forja-hardware',
      tenantLine: 'Forja · hardware',
      name: 'Cordless drill driver 18 V',
      attributes: [
        { name: 'Power', value: '450 W' },
        { name: 'Weight', value: '1.4 kg' },
        { name: 'Cordless', value: 'Yes' },
      ],
    },
    {
      slug: 'lino-apparel',
      tenantLine: 'Lino · apparel',
      name: 'Linen shirt dress',
      attributes: [
        { name: 'Sizes', value: 'XS–XL' },
        { name: 'Color', value: 'Sand' },
        { name: 'Organic', value: 'Yes' },
      ],
    },
    {
      slug: 'folio-books',
      tenantLine: 'Folio · books',
      name: "The Lighthouse Keeper's Daughter",
      attributes: [
        { name: 'Author', value: 'Elena Marlow' },
        { name: 'Pages', value: '384' },
        { name: 'Hardcover', value: 'Yes' },
      ],
    },
  ] as DemoTag[],
  howItWorks: {
    heading: 'One tag, two sides',
    turn: 'Turn the tag',
    frontTitle: 'What visitors see',
    front: ['Photos of every product', 'Its attributes, side by side', 'Search and filters', 'An inquiry form'],
    backTitle: 'What you edit',
    back: [
      'Products and their images',
      'Categories and attributes',
      'Featured products',
      'Import from a CSV file',
      'Your logo and brand color',
    ],
  },
  anyBusiness: {
    heading: 'Any business, its own attributes',
    lede: 'Each catalog defines what matters for its products.',
    forja: 'Power, voltage and weight for every tool.',
    lino: 'Sizes, colors and season for every garment.',
    folio: 'Author, pages and formats for every book.',
    openCatalog: 'See its catalog',
    // Accessible name of a shop tag link; {tenant} is replaced by the tenant line.
    openCatalogName: 'See the {tenant} catalog',
  },
  notDo: {
    heading: 'What it does not do',
    body: 'No prices, no cart, no payments, no stock. Just Looking shows your products and passes inquiries on to you; the sale happens your way.',
  },
  closing: {
    heading: 'See it with real products.',
  },
  footer: {
    signIn: 'Sign in',
    madeBy: 'A product by',
  },
}

export type LandingCopy = typeof en

const es: LandingCopy = {
  meta: {
    title: 'Just Looking: un catálogo de productos para cualquier negocio',
    description:
      'Just Looking publica tus productos con fotos, atributos, búsqueda y filtros, y deja que los visitantes te envíen consultas. Sin precios ni carrito.',
  },
  nav: {
    signIn: 'Entrar',
    languageGroup: 'Idioma',
    english: 'English',
    spanish: 'Español',
  },
  hero: {
    headlineBefore: 'Que miren ',
    headlineHighlight: 'todo',
    headlineAfter: ' lo que quieran.',
    lede: 'Un catálogo para cualquier negocio: tus productos con fotos y atributos, búsqueda y filtros, y un formulario de consulta. Los visitantes miran; tú respondes.',
    tryDemo: 'Probar la demo',
    demoNote: '3 tiendas de ejemplo · sin registro',
    pun: '«Solo mirando»: lo que dices en una tienda cuando solo quieres mirar.',
  },
  tag: {
    price: 'Precio',
    stamp: 'Solo mirando',
    openDemo: 'Abrir la demo',
    openDemoName: 'Abrir la demo de {tenant}',
  },
  demoTags: [
    {
      slug: 'forja-hardware',
      tenantLine: 'Forja · ferretería',
      name: 'Cordless drill driver 18 V',
      attributes: [
        { name: 'Potencia', value: '450 W' },
        { name: 'Peso', value: '1,4 kg' },
        { name: 'Sin cable', value: 'Sí' },
      ],
    },
    {
      slug: 'lino-apparel',
      tenantLine: 'Lino · ropa',
      name: 'Linen shirt dress',
      attributes: [
        { name: 'Tallas', value: 'XS–XL' },
        { name: 'Color', value: 'Arena' },
        { name: 'Ecológico', value: 'Sí' },
      ],
    },
    {
      slug: 'folio-books',
      tenantLine: 'Folio · libros',
      name: "The Lighthouse Keeper's Daughter",
      attributes: [
        { name: 'Autora', value: 'Elena Marlow' },
        { name: 'Páginas', value: '384' },
        { name: 'Tapa dura', value: 'Sí' },
      ],
    },
  ],
  howItWorks: {
    heading: 'Una etiqueta, dos caras',
    turn: 'Dar la vuelta',
    frontTitle: 'Lo que ven los visitantes',
    front: ['Fotos de cada producto', 'Sus atributos, uno junto a otro', 'Búsqueda y filtros', 'Un formulario de consulta'],
    backTitle: 'Lo que editas tú',
    back: [
      'Productos y sus imágenes',
      'Categorías y atributos',
      'Productos destacados',
      'Importación desde un fichero CSV',
      'Tu logotipo y tu color de marca',
    ],
  },
  anyBusiness: {
    heading: 'Cualquier negocio, con sus propios atributos',
    lede: 'Cada catálogo define lo que importa de sus productos.',
    forja: 'Potencia, voltaje y peso de cada herramienta.',
    lino: 'Tallas, colores y temporada de cada prenda.',
    folio: 'Autor, páginas y formatos de cada libro.',
    openCatalog: 'Ver su catálogo',
    openCatalogName: 'Ver el catálogo de {tenant}',
  },
  notDo: {
    heading: 'Lo que no hace',
    body: 'Sin precios, sin carrito, sin pagos, sin stock. Just Looking enseña tus productos y te pasa las consultas; la venta la cierras a tu manera.',
  },
  closing: {
    heading: 'Míralo con productos de verdad.',
  },
  footer: {
    signIn: 'Entrar',
    madeBy: 'Un producto de',
  },
}

export const landingCopy: Record<LandingLanguage, LandingCopy> = { en, es }
