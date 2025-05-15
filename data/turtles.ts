export interface Turtle {
  name: string
  slug: string
  species: string
  weight?: number
  length?: number
  rescueDate?: string
  status?: string
  shortDescription: string
  description: string
  characteristics?: string[]
  currentStatus?: string
  image: string
  imageGallery: string[]
  lastUpdate?: string
  batteryLife?: string,
  releaseDate?: string
}

export const turtles: Turtle[] = [
  {
    name: "Complot",
    slug: "complot",
    species: "Caretta caretta",
    weight: 52,
    rescueDate: "13/12/2021",
    status: "En recuperació",
    shortDescription:
      "Tortuga rescatada després de quedar atrapada en una xarxa d'arrossegament. Presenta ferides a la closca.",
    description: `El 13 de desembre del 2021 rebem avís d'una tortuga capturada accidentalment per una xarxa d'arrossegament. Ens avisava l'embarcació La Mar dels Casis d'Alcanar, embarcació col·laboradora de la campanya "Pescadors a favor de la Mar".

En rebre l'avís, l'equip de l'Àrea de Clínica i Rescat de la Fundació CRAM es va desplaçar fins a la zona per a recollir a l'animal. En una primera valoració, es pot observar una alta presència de balanos de diferents grandàries per tot el cos i closca, així com diferents ferides en la closca.

En arribar a la Clínica del CRAM es realitza una exhaustiva anàlisi i s'observa que presenta fortes lesions tant en la closca com en un dels seus laterals, amb teixit necròtic profund. En les radiografies es pot, a més, determinar que presenta una síndrome descompresiu moderat. La tortuga Complot pesa 52 quilos en el moment del seu ingrés.

Presenta un estat molt crític i es prioritza estabilitzar a l'animal i fer les primeres cures de les seves ferides. Probablement es deuen a una col·lisió de fa força temps amb l'hèlix d'una embarcació.

L'equip veterinari i els supervols del CRAM han estat molt pendents de l'evolució de la tortuga Complot. Se li va pautar un tractament d'antibiòtics i analgèsia, així com neteja de les ferides i banys amb sèrum ozonitzat per a afavorir la cicatrització cada tres dies.

Des del principi no ha perdut les ganes de menjar, això sí, amb pinces. Els nostres supervols tenen molta paciència oferint-li el "pescadito" diari que necessita i ens diuen que és molt sibarita: només li agrada el calamar i les sardines!

Complot ha demostrat que és una tortuga molt forta i amb moltes ganes de viure i la seva evolució, encara que està sent lenta i necessitarà molt temps, és sorprenent. Ha passat la fase crítica, es troba estable, les seves ferides estan cicatritzant bé i ha engreixat 1 quilo des del seu ingrés.`,
    characteristics: [
      "Espècie: Tortuga babaua (Caretta caretta)",
      "Pes en el rescat: 52 kg",
      "Pes actual: 53 kg",
      "Rescat: Xarxa d'arrossegament",
      "Lesions: Ferides a la closca i síndrome descompressiu",
    ],
    currentStatus:
      "Actualment, Complot es troba en fase de recuperació. Les seves ferides estan cicatritzant correctament i mostra bon apetit, preferint calamar i sardines. Ha superat la fase crítica i es troba estable.",
    image: "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2023/01/tortuga-complot-2.jpg",
    imageGallery: [
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2023/01/tortuga-complot-3.jpg",
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2023/01/tortuga-complot-6.jpg",
    ],
    lastUpdate: "10/05/2024",
    batteryLife: "aproximadament 1 any més",
  },
  {
    name: "Damm",
    slug: "damm",
    species: "Caretta caretta",
    rescueDate: "25/11/2009",
    status: "Resident permanent",
    shortDescription:
      "Tortuga babaua rescatada amb una infecció ocular greu que li va fer perdre la visió d'un ull. Resident permanent del centre.",
    description: `Damm és una tortuga marina de l'espècie Caretta caretta, comunament coneguda com a tortuga babaua. Va ser trobada encallada i posteriorment rescatada, la qual cosa va portar al seu ingrés al centre de conservació el 25 de novembre de 2009. Aquesta femella prové de la població d'Amposta, a la comarca de Montsià, destacant la importància d'aquestes accions per a la preservació de la seva espècie. Les tortugues babaues com Damm enfronten nombrosos desafiaments en el seu entorn natural, incloent-hi la pèrdua d'hàbitat, la contaminació i les interaccions amb les activitats humanes, la qual cosa sovint resulta en varamientos com el que va sofrir Damm. El seu rescat no sols representa un esforç vital per a la seva supervivència individual sinó que també subratlla la necessitat de protegir i conservar aquestes magnífiques criatures marines i els seus hàbitats per a assegurar el seu futur en els nostres oceans.

A Damm la va trobar un particular que informo el CRAM i la va portar al Centre de Rescat el 25 de novembre del 2009. Els veterinaris van observar que tenia en els ulls una infecció molt aguda i se li va aplicar un tractament: un ull es va recuperar però el dret el va perdre, ja que la infecció estava massa avançada. La seva evolució va ser bona, però per què creieu que està en el Centre? Creiem que no podria competir amb les altres tortugues a l'hora d'alimentar-se ja que li falta la visió en un ull.

En el Centre de Recuperació hi ha diversos exemplars de tortuga marina que degut les seves lesions no podran ser reintroduïdes en la mar, en considerar-se que no sobreviurien en el mitjà salvatge. D'aquesta manera, les tortugues passen a ser residents en el Centre de Rescat i requereixen d'una atenció específica diàriament; alimentació, neteja i seguiment mèdic.

Aquestes tortugues reben les visites de la gent que ve al CRAM. I algunes d'elles participen en els projectes de recerca que duu a terme la Fundació.`,
    characteristics: [
      "Espècie: Tortuga babaua (Caretta caretta)",
      "Rescat: 25 de novembre de 2009",
      "Origen: Amposta, Montsià",
      "Condició: Pèrdua de visió en un ull",
      "Estat: Resident permanent del centre",
    ],
    currentStatus:
      "Damm és resident permanent del Centre de Recuperació ja que, degut a la pèrdua de visió en un ull, es considera que no podria competir adequadament amb altres tortugues en el medi natural per alimentar-se.",
    image: "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2016/02/damm-600x600.jpg",
    imageGallery: [
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2017/01/tortuga-damm-2.jpg",
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2017/01/tortuga-damm-3.jpg",
    ],
    lastUpdate: "05/05/2024",
  },
  {
    name: "Daura",
    slug: "daura",
    species: "Caretta caretta",
    weight: 52,
    status: "En recuperació",
    shortDescription:
      "Tortuga amb lesions greus a la closca i un lateral, probablement causades per una col·lisió amb una embarcació.",
    description: `En arribar a la Clínica del CRAM es realitza una exhaustiva anàlisi i s'observa que presenta fortes lesions tant en la closca com en un dels seus laterals, amb teixit necròtic profund. En les radiografies es pot, a més, determinar que presenta una síndrome descompresiu moderat. La tortuga Daura pesa 52 quilos en el moment del seu ingrés.

Presenta un estat molt crític i es prioritza estabilitzar a l'animal i fer les primeres cures de les seves ferides. Probablement es deuen a una col·lisió de fa força temps amb l'hèlix d'una embarcació.

L'equip veterinari i els supervols del CRAM han estat molt pendents de l'evolució de la tortuga Daura. Se li va pautar un tractament d'antibiòtics i analgèsia, així com neteja de les ferides i banys amb sèrum ozonitzat per a afavorir la cicatrització cada tres dies.

Des del principi no ha perdut les ganes de menjar, això sí, amb pinces. Els nostres supervols tenen molta paciència oferint-li el "pescadito" diari que necessita i ens diuen que és molt sibarita: només li agrada el calamar i les sardines!

Daura ha demostrat que és una tortuga molt forta i amb moltes ganes de viure i la seva evolució, encara que està sent lenta i necessitarà molt temps, és sorprenent. Ha passat la fase crítica, es troba estable, les seves ferides estan cicatritzant bé i ha engreixat 1 quilo des del seu ingrés.`,
    characteristics: [
      "Espècie: Tortuga babaua (Caretta caretta)",
      "Pes en el rescat: 52 kg",
      "Pes actual: 53 kg",
      "Lesions: Ferides a la closca i síndrome descompressiu",
      "Causa probable: Col·lisió amb embarcació",
    ],
    currentStatus:
      "Daura es troba en fase de recuperació. Ha superat la fase crítica i es troba estable. Les seves ferides estan cicatritzant correctament i mostra bon apetit, preferint calamar i sardines.",
    image: "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/03/DAURA-INGRESO-1.1200-400x300.jpg",
    imageGallery: [
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/03/DAURA-INGRESO-2.1200-400x300.jpg",
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/03/DAURA-INGRESO-3.1200-400x300.jpg",
    ],
    lastUpdate: "08/05/2024",
    batteryLife: "aproximadament 10 mesos més",
  },
  {
    name: "Godzilla",
    slug: "godzilla",
    species: "Caretta caretta",
    weight: 62,
    rescueDate: "17/01/2024",
    status: "En recuperació",
    shortDescription:
      "Gran exemplar femella de 62 kg rescatada per l'embarcació Carlos de La Ràpita. Coneguda pel seu caràcter fort.",
    description: `La pacient número 6 en el centre de rescat de fauna marina, a qui carinyosament anomenen Miu-Godzilla, és un cas especial que requereix atenció contínua. Aquesta tortuga femella, que va ingressar a les instal·lacions el 17 de gener, pesa uns notables 62 quilograms. El seu maneig ha demostrat ser bastant desafiant, no només pel seu considerable tamany sinó també per la seva forta personalitat, que afegeix una capa extra de complexitat al seu cuidat diari.

L'arribada de Miu-Godzilla al centre va ser possible gràcies a la col·laboració crucial de la tripulació de l'embarcació Carlos de La Ràpita, que la va trobar en condicions preocupants i no va dubtar a contactar amb la fundació CRAM. Des del seu ingress, s'han observat avenços significatius en la seva recuperació, especialment en el seu comportament alimentari. Després d'alguns dies d'esforç, Miu-Godzilla ha començat a alimentar-se per si mateixa, un indicatiu important de millora en el seu estat de salut i benestar.

Actualment, s'està a l'espera dels resultats de les seves últimes proves analítiques. Aquests anàlisis són essencials per entendre millor el seu estat de salut general i per ajustar els seus plans de tractament i rehabilitació. L'equip de veterinaris especialitzats en vida marina de la fundació CRAM està compromès a proporcionar-li tota la cura necessària per assegurar la seva eventual recuperació completa i, esperen, la seva posterior reintegració al seu hàbitat natural.`,
    characteristics: [
      "Espècie: Tortuga babaua (Caretta caretta)",
      "Pes: 62 kg",
      "Ingrés: 17 de gener de 2024",
      "Rescat: Embarcació Carlos de La Ràpita",
      "Personalitat: Forta, desafiant de manejar",
    ],
    currentStatus:
      "Godzilla mostra avenços significatius en la seva recuperació. Ha començat a alimentar-se per si mateixa, un indicador important de millora. S'està a l'espera dels resultats de les seves últimes proves analítiques per ajustar el seu pla de tractament.",
    image: "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/04/tortugas-maria-niki-tomas-1.jpg",
    imageGallery: [
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/04/tortugas-maria-niki-tomas-2-800x600.jpg",
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/04/tortugas-maria-niki-tomas-3-800x600.jpg",
    ],
    lastUpdate: "01/05/2024",
    batteryLife: "aproximadament 11 mesos més",
  },
  {
    name: "Maria",
    slug: "maria",
    species: "Caretta caretta",
    weight: 41,
    status: "En recuperació",
    shortDescription:
      "Femella fèrtil capturada accidentalment per una xarxa de cèrcol. Ha expulsat nombrosos plàstics des del seu ingrés.",
    description: `Avui us presentem a la tortuga María, la pacient 55 d'enguany. Es tracta d'una femella de tortuga Caretta caretta de 41 quilos de pes que va ser capturada accidentalment per una xarxa de cèrcol.

El passat 1 d'agost l'embarcació Germans Brull Vila ens va donar avís de captura de tortuga i l'equip de Clínica i Rescat de la Fundació CRAM es va desplaçar fins a la zona.

En la seva arribada a la clínica del CRAM s'observa que va vomitar l'aliment que havia ingerit en la xarxa de cèrcol i que presenta una ferida en la comissura de la boca ocasionada per un fil de pesca o ham. El que podria indicar que podria tenir un ham en el seu interior. En les radiografies realitzades no s'observa cap ham o objecte, per la qual cosa ens quedem més tranquils. També se li realitza una ecografia i es determina que presenta fol·licles, per la qual cosa es tracta d'una femella fèrtil en període reproductiu.

Cal destacar que María ha expulsat un gran nombre de plàstics des de la seva arribada al Centre de Recuperació. Molts dels pacients que ingressen en el CRAM defequen plàstics. La ingesta d'aquests residus els produeix obstruccions intestinals que poden desencadenar-los grans problemes de salut i fins i tot la mort. A María se li ha administrat antibiòtic, fluïdoteràpia i analgèsia. De moment encara no ha menjat però presenta una bona activitat i actitud.

Gràcies al suport de Quadpack en l'estudi sobre presència de plàstics en tortugues marines podem conèixer més sobre la contaminació que existeix en la mar i aconseguir a ajudar a disminuir-la.

L'assistència a aquests dos exemplars de tortuga marina s'ha realitzat en el marc del projecte SERVIMAR, secundat per la Fundació Biodiversitat del MITECO a través del Pla de Recuperació, Transformació i Resiliència (PRTR), finançat pels fons NextGenerationEU, la col·laboració de la Generalitat de Catalunya i amb fons propis.`,
    characteristics: [
      "Espècie: Tortuga babaua (Caretta caretta)",
      "Pes: 41 kg",
      "Condició: Femella fèrtil en període reproductiu",
      "Rescat: Captura accidental per xarxa de cèrcol",
      "Problema: Ingestió de plàstics, ferida a la boca",
    ],
    currentStatus:
      "Maria està rebent tractament amb antibiòtics, fluïdoteràpia i analgèsia. Encara no ha començat a menjar, però mostra bona activitat i actitud. Ha expulsat nombrosos plàstics des del seu ingrés, evidenciant el problema de la contaminació marina.",
    image: "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/04/tortugas-maria-niki-tomas-1.jpg",
    imageGallery: [
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/08/MARIA2.jpg",
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/08/MARIA4-800x600.jpg",
    ],
    lastUpdate: "03/05/2024",
    batteryLife: "aproximadament 9 mesos més",
  },
  {
    name: "Sis",
    slug: "sis",
    species: "Caretta caretta",
    weight: 2,
    length: 30,
    rescueDate: "30/10/2014",
    status: "En recuperació",
    shortDescription:
      "Una de les tres supervivents d'un niu trobat a la platja Llarga de Tarragona. Presenta problemes de mobilitat a les aletes davanteres.",
    description: `En clínica del CRAM s'estan recuperant 3 tortugues marines babaues (Caretta caretta) d'una posada de nidificació a la platja Llarga de Tarragona. Aquest niu format per un conjunt de 68 ous va ser trobat el 30 d'octubre de 2014 amb 12 tortugues vives, 13 que no havien sobreviscut i 9 ous amb els embrions. A més, es van trobar 34 ous que havien fet eclosió i que per tant s'haurien dirigit a la mar.

La Xarxa de Rescat de Fauna Marina (XRFM) va traslladar les 12 cries rescatades a l'Estació Biològica del Canal Vell del Parc Natural del Delta de l'Ebre on se'ls va aplicar un seguiment per a la seva recuperació. Així i tot, després de tot el procés van sobreviure 3 exemplars d'aquests rèptils, que el 16 de juny de 2015, van ser traslladats a les instal·lacions del CRAM per a garantir la seva evolució favorable amb un equip especialitzat en aquests vertebrats marins.

Actualment, les tres pacients de tortuga babaua es recuperen favorablement en la clínica del centre i ja mesuren entre 20-30 centímetres de longitud i pesen entre 1.5-2 quilograms. Quan van ser trobades en el niu mesuraven poc més de 5 centímetres i pesaven uns 25 grams. Per al seu òptim creixement, segueixen una dieta que representa el 2% del seu pes corporal en cada presa (2 diàries, amb 2 dies de dejuni a la setmana) i consta de peix blau, peix blanc i calamar.

En el tractament de les tortugues s'inclou una pauta de rehabilitació diària ja que presenten problemes de mobilitat en les aletes davanteres, a més de les analítiques sanguínies mensuals, desparasitaciones periòdiques i biometries setmanals.

Amb aquest procés de recuperació es pretén que aviat puguin recuperar la mobilitat suficient per a sobreviure en el seu hàbitat i així ser alliberades.`,
    characteristics: [
      "Espècie: Tortuga babaua (Caretta caretta)",
      "Origen: Niu a la platja Llarga de Tarragona",
      "Pes actual: 1.5-2 kg",
      "Longitud actual: 20-30 cm",
      "Condició: Problemes de mobilitat en aletes davanteres",
    ],
    currentStatus:
      "Sis és una de les tres supervivents d'un niu trobat a Tarragona. Es recupera favorablement, però encara presenta problemes de mobilitat a les aletes davanteres que requereixen rehabilitació diària. Segueix una dieta específica per al seu òptim creixement.",
    image: "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/07/tortuga-duna-4.jpg",
    imageGallery: [
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/07/tortuga-duna-5.jpg",
      "//wsrv.nl/?url=https://cram.org/wp-content/uploads/2022/07/tortuga-duna-3.jpg",
    ],
    lastUpdate: "06/05/2024",
    batteryLife: "aproximadament 8 mesos més",
  },
]
