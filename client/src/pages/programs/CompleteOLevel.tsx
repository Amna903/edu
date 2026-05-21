import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

type Course = {
  code: string;
  title: string;
  description: string;
  paper?: "Paper 1" | "Paper 2";
  secondaryLink?: {
    label: string;
    href: string;
  };
};

type SubjectRow = {
  id: string;
  name: string;
  label: string;
  abbreviation: string;
  colour: string;
  courses: Course[];
};

const subjectRows: SubjectRow[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    label: "Mathematics | O-Level 4024 / IGCSE 0580",
    abbreviation: "MAT",
    colour: "#0B3C5D",
    courses: [
      {
        code: "S-MAT-1",
        title: "Numbers",
        description:
          "Whole numbers, fractions, decimals, percentages, ratio and proportion. Foundational number work for all O-Level Mathematics papers. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP, UAE curriculum.",
      },
      {
        code: "S-MAT-1A",
        title: "Everyday Mathematics",
        description:
          "Personal and household finance, currency conversion, time and distance problems, taxation and profit/loss. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-2",
        title: "Indices and Standard Form",
        description:
          "Laws of indices, negative and fractional indices, standard form notation and operations. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP, UAE curriculum, Malaysian O-Level.",
      },
      {
        code: "S-MAT-3",
        title: "Inequalities",
        description:
          "Linear inequalities, solving and representing on a number line, inequality notation. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP.",
      },
      {
        code: "S-MAT-4",
        title: "Algebraic Expressions and Manipulation",
        description:
          "Expansion, factorisation, simplification, algebraic fractions, completing the square. Applicable: Cambridge O-Level 4024, IGCSE 0580, all international O-Level equivalent curricula.",
      },
      {
        code: "S-MAT-4A",
        title: "Variations",
        description:
          "Direct, inverse and joint variation — algebraic modelling of proportional relationships. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-5",
        title: "Equations and Simultaneous Equations",
        description:
          "Linear, quadratic and simultaneous equations — algebraic and graphical methods. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP, Malaysian O-Level, UAE curriculum.",
      },
      {
        code: "S-MAT-6",
        title: "Coordinate Geometry",
        description:
          "Gradient, midpoint, distance, equation of a straight line, parallel and perpendicular conditions. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-7",
        title: "Graphs of Functions and Graphical Solutions",
        description:
          "Plotting and interpreting quadratic, cubic, exponential and reciprocal functions. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-8",
        title: "Graphs in Practical Situations and Travel Graphs",
        description:
          "Interpreting and drawing distance-time, speed-time and other real-world graphs. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-9",
        title: "Similarity and Congruency",
        description:
          "Similar and congruent shapes, scale factors, area and volume ratios. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP.",
      },
      {
        code: "S-MAT-10",
        title: "Mensuration",
        description:
          "Perimeter, area and volume of 2D and 3D shapes — circles, cylinders, cones and spheres. Applicable: Cambridge O-Level 4024, IGCSE 0580, all international secondary mathematics.",
      },
      {
        code: "S-MAT-11",
        title: "Symmetry",
        description:
          "Line and rotational symmetry of 2D shapes. Properties of symmetry in geometric figures. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-12",
        title: "Loci and Constructions",
        description:
          "Geometric constructions with ruler and compasses — perpendicular bisectors, angle bisectors, loci problems. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-13",
        title: "Angles and Circle Properties",
        description:
          "Circle theorems — angle at centre, angle in semicircle, angles in same segment, tangent properties, alternate segment theorem. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-14",
        title: "Trigonometry",
        description:
          "Sine, cosine, tangent ratios — right-angled triangles, sine rule, cosine rule and area formula. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP, all international secondary mathematics.",
      },
      {
        code: "S-MAT-15",
        title: "Bearings",
        description:
          "Three-figure bearings, direction problems, combined trigonometry and bearings questions. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-16",
        title: "Probability",
        description:
          "Theoretical and experimental probability, combined events, probability trees, independent and mutually exclusive events. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP.",
      },
      {
        code: "S-MAT-17",
        title: "Transformation",
        description:
          "Translation, reflection, rotation, enlargement and their combinations. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-18",
        title: "Vectors in Two Dimensions",
        description:
          "Column vectors, addition and subtraction, scalar multiples, magnitude, position vectors. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-19",
        title: "Statistics",
        description:
          "Mean, median, mode, range, cumulative frequency, histograms, box-and-whisker plots, scatter diagrams. Applicable: Cambridge O-Level 4024, IGCSE 0580, IB MYP.",
      },
      {
        code: "S-MAT-20",
        title: "Sets and Venn Diagrams",
        description:
          "Set notation, union, intersection, complement, Venn diagrams for two and three sets. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-21",
        title: "Matrices",
        description:
          "Matrix operations, determinant, inverse of 2×2 matrix, simultaneous equations using matrices. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-22",
        title: "Functions",
        description:
          "Function notation, domain and range, composite and inverse functions. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
      {
        code: "S-MAT-23",
        title: "Problem-Solving and Patterns",
        description:
          "Mathematical reasoning, number patterns, sequences and generalisation. Cambridge Paper 2 structured problem-solving questions. Applicable: Cambridge O-Level 4024, IGCSE 0580.",
      },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    label: "Physics | O-Level 5054 / IGCSE 0625",
    abbreviation: "PHY",
    colour: "#7C3AED",
    courses: [
      {
        code: "S-PHY-1",
        title: "Mass, Weight, Density and Volume",
        description:
          "Definitions and units of mass, weight and density. Volume of regular and irregular solids. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP, UAE curriculum.",
      },
      {
        code: "S-PHY-2",
        title: "Kinematics",
        description:
          "Distance, displacement, speed, velocity and acceleration. Distance-time and velocity-time graphs. Equations of uniform acceleration. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP, UAE curriculum.",
      },
      {
        code: "S-PHY-3",
        title: "Force, Vector and Scalar Quantities",
        description:
          "Contact and non-contact forces, vectors and scalars, resultant forces, Newton's laws, friction. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-4",
        title: "Work, Energy and Power",
        description:
          "Work done, kinetic and potential energy, conservation of energy, power and efficiency. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP, all international secondary physics.",
      },
      {
        code: "S-PHY-5",
        title: "Principle of Moments",
        description:
          "Moment of a force, lever systems, equilibrium, centre of gravity and stability. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-6",
        title: "Pressure",
        description:
          "Pressure in solids, liquids and gases. Hydraulic systems, atmospheric pressure, barometer and manometer. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-7",
        title: "Heat Capacity and Expansion",
        description:
          "Specific heat capacity, thermal expansion of solids, liquids and gases. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-8",
        title: "Transfer of Heat",
        description:
          "Conduction, convection and radiation — mechanisms, comparisons and applications. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-9",
        title: "Temperature",
        description:
          "Temperature scales, thermometers, fixed points, absolute zero. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-10",
        title: "Gas Laws and Kinetic Theory",
        description:
          "Boyle's law, Charles's law, pressure law, kinetic particle theory. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-11",
        title: "Change of State",
        description:
          "Melting, boiling, evaporation, condensation, solidification, latent heat. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-12",
        title: "Longitudinal Waves",
        description:
          "Sound — compression and rarefaction, frequency, wavelength, amplitude, speed, echoes. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-13",
        title: "Transverse Waves",
        description:
          "Transverse wave properties, wave equation, types of transverse waves. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-14",
        title: "Dispersion of Light",
        description:
          "White light dispersion by prism, spectrum colours, colour filters and pigments. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-15",
        title: "Lenses",
        description:
          "Converging and diverging lenses, ray diagrams, focal length, real and virtual images. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-16",
        title: "Refraction",
        description:
          "Snell's law, refractive index, total internal reflection, critical angle, optical fibres. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-17",
        title: "Reflection",
        description:
          "Laws of reflection, plane mirrors, regular and diffuse reflection. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-18",
        title: "Electromagnetic Waves",
        description:
          "The electromagnetic spectrum — properties, speeds, wavelengths, frequencies, uses and hazards. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP, all international secondary physics.",
      },
      {
        code: "S-PHY-19",
        title: "Static Electricity",
        description:
          "Charging by friction and induction, electric fields, Van de Graaff, hazards and uses. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-20",
        title: "Current Electricity",
        description:
          "Charge, current, potential difference, resistance, Ohm's law, series and parallel circuits. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP, UAE curriculum.",
      },
      {
        code: "S-PHY-21",
        title: "Magnetism",
        description:
          "Magnetic fields, permanent magnets, field patterns, magnetic materials. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-22",
        title: "Magnetic Effect of Current",
        description:
          "Force on a current-carrying conductor, DC motor, Fleming's left-hand rule, electromagnets. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-23",
        title: "Electromagnetic Induction",
        description:
          "Faraday's law, Lenz's law, AC generator, transformer, national grid. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-24",
        title: "Nuclear Model of the Atom",
        description:
          "Protons, neutrons, electrons, atomic number, mass number, isotopes. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-25",
        title: "Radioactivity",
        description:
          "Alpha, beta, gamma radiation — properties, uses, half-life, nuclear equations, safety. Applicable: Cambridge O-Level 5054, IGCSE 0625, IB MYP.",
      },
      {
        code: "S-PHY-26",
        title: "Earth and the Solar System",
        description:
          "Solar system structure, planets, moons, comets, seasons, Moon's phases. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
      {
        code: "S-PHY-27",
        title: "Stars and the Universe",
        description:
          "Star formation and life cycle, Hertzsprung-Russell diagram, galaxies, Big Bang, red shift. Applicable: Cambridge O-Level 5054, IGCSE 0625.",
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    label: "Chemistry | O-Level 5070 / IGCSE 0620",
    abbreviation: "CHE",
    colour: "#0369A1",
    courses: [
      {
        code: "S-CHE-1",
        title: "Particulate Nature of Matter and Diffusion",
        description:
          "States of matter, particle model, kinetic theory, diffusion — rates and factors. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP, all international secondary chemistry.",
      },
      {
        code: "S-CHE-2",
        title: "Experimental Techniques",
        description:
          "Filtration, evaporation, distillation, chromatography, crystallisation, Rf values, laboratory safety. Applicable: Cambridge O-Level 5070, IGCSE 0620.",
      },
      {
        code: "S-CHE-3",
        title: "Atomic Structure and Chemical Bonding",
        description:
          "Atomic structure, electronic configuration, ionic, covalent and metallic bonding, dot-and-cross diagrams. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP, UAE curriculum.",
      },
      {
        code: "S-CHE-4",
        title: "Stoichiometry and the Mole Concept",
        description:
          "Mole calculations, empirical and molecular formulae, percentage composition, limiting reagent. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP.",
      },
      {
        code: "S-CHE-5",
        title: "The Periodic Table",
        description:
          "Groups and periods, trends in properties, Group I, Group VII, Noble Gases, transition metals. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP, all international secondary chemistry.",
      },
      {
        code: "S-CHE-6",
        title: "Metals and Non-Metals",
        description:
          "Reactivity series, metal extraction, corrosion, properties and uses of metals and non-metals. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP.",
      },
      {
        code: "S-CHE-7",
        title: "Acids, Bases and Salts",
        description:
          "pH scale, neutralisation, preparation of soluble and insoluble salts, titration. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP, UAE curriculum.",
      },
      {
        code: "S-CHE-8",
        title: "Redox Reactions",
        description:
          "Oxidation states, oxidising and reducing agents, half-equations, electron transfer. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP.",
      },
      {
        code: "S-CHE-9",
        title: "Electricity and Chemistry",
        description:
          "Electrolysis — electrolyte, electrode, products at each electrode, industrial applications. Applicable: Cambridge O-Level 5070, IGCSE 0620.",
      },
      {
        code: "S-CHE-10",
        title: "Energy Changes and Speed of Reactions",
        description:
          "Exothermic and endothermic reactions, activation energy, rate factors, catalysts, collision theory. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP.",
      },
      {
        code: "S-CHE-11",
        title: "Organic Chemistry",
        description:
          "Alkanes, alkenes, polymers, alcohols, esters, carboxylic acids, fermentation, polymerisation. Applicable: Cambridge O-Level 5070, IGCSE 0620, IB MYP.",
      },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    label: "Biology | O-Level 5090 / IGCSE 0610",
    abbreviation: "BIO",
    colour: "#16A34A",
    courses: [
      {
        code: "S-BIO-1",
        title: "Cell Structure and Organization",
        description:
          "Animal and plant cells — organelles, functions, differences. Light microscopy. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP, all international secondary biology.",
      },
      {
        code: "S-BIO-2",
        title: "Specialised Cells, Tissues and Organs",
        description:
          "Cell differentiation, specialised cell types, tissue and organ hierarchy. Applicable: Cambridge O-Level 5090, IGCSE 0610.",
      },
      {
        code: "S-BIO-3",
        title: "Diffusion and Osmosis",
        description:
          "Diffusion and osmosis — mechanisms, factors affecting rates, turgor and plasmolysis. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-4",
        title: "Enzymes",
        description:
          "Enzyme structure, active site, specificity, temperature and pH effects, denaturation. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-5",
        title: "Plant Nutrition",
        description:
          "Photosynthesis — equation, chlorophyll, light and dark reactions, limiting factors, leaf structure. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-6",
        title: "Transport in Flowering Plants",
        description:
          "Xylem and phloem, transpiration, transpiration stream, factors affecting transpiration rate. Applicable: Cambridge O-Level 5090, IGCSE 0610.",
      },
      {
        code: "S-BIO-7",
        title: "Food and Nutrition",
        description:
          "Carbohydrates, proteins, lipids, vitamins, minerals, water and fibre — roles and sources. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-8",
        title: "Digestion",
        description:
          "Mechanical and chemical digestion, enzymes, absorption, gut wall structure. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-9",
        title: "Transport in Humans",
        description:
          "Heart structure and function, blood composition, blood groups, clotting. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-10",
        title: "Respiration",
        description:
          "Aerobic and anaerobic respiration — equations, energy yield, locations. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-11",
        title: "Excretion",
        description:
          "Kidneys — urine formation, osmoregulation. Liver — deamination, bile. Applicable: Cambridge O-Level 5090, IGCSE 0610.",
      },
      {
        code: "S-BIO-12",
        title: "Homeostasis",
        description:
          "Blood glucose regulation, thermoregulation, osmoregulation — negative feedback. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-13",
        title: "Coordination and Response",
        description:
          "Nervous system — neurons, synapses, reflex arc. Endocrine system — hormones. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-14",
        title: "Support, Movement and Locomotion",
        description:
          "Skeleton functions, joint types, antagonistic muscles, synovial joint structure. Applicable: Cambridge O-Level 5090, IGCSE 0610.",
      },
      {
        code: "S-BIO-15",
        title: "Use and Abuse of Drugs",
        description:
          "Medicinal and recreational drugs. Antibiotic resistance. Applicable: Cambridge O-Level 5090, IGCSE 0610.",
      },
      {
        code: "S-BIO-16",
        title: "Micro-organisms and Biotechnology",
        description:
          "Bacteria, viruses, fungi. Fermentation, genetic engineering. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-17",
        title: "Energy and the Ecosystem",
        description:
          "Food chains and webs, trophic levels, energy flow, carbon and nitrogen cycles. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-18",
        title: "Effects of Humans on the Ecosystem",
        description:
          "Deforestation, pollution, greenhouse effect, acid rain, conservation. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-19",
        title: "Reproduction in Plants",
        description:
          "Pollination, fertilisation, seed dispersal, vegetative propagation. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
      {
        code: "S-BIO-20",
        title: "Reproduction in Humans",
        description:
          "Reproductive systems, fertilisation, pregnancy, birth, menstrual cycle, contraception. Applicable: Cambridge O-Level 5090, IGCSE 0610.",
      },
      {
        code: "S-BIO-21",
        title: "Inheritance",
        description:
          "Chromosomes, genes, alleles, Mendel's laws, monohybrid cross, sex determination. Applicable: Cambridge O-Level 5090, IGCSE 0610, IB MYP.",
      },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    label: "Economics | O-Level 2281 / IGCSE 0455",
    abbreviation: "ECO",
    colour: "#0D9488",
    courses: [
      {
        code: "S-ECO-C01",
        title: "Basic Economic Problem",
        description:
          "Scarcity and choice, factors of production, opportunity cost, production possibility curves, the basic economic questions. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C02",
        title: "Allocation of Resources — Markets",
        description:
          "Demand and supply analysis — demand curves, supply curves, the market system. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C03",
        title: "Price Mechanism",
        description:
          "Price determination, market equilibrium and disequilibrium, the effects of price changes. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C04",
        title: "Market Failure",
        description:
          "Market failure — externalities, public goods, merit goods, government intervention. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C05",
        title: "Elasticity",
        description:
          "Price elasticity of demand and supply — calculation, interpretation and real-world applications. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C06",
        title: "Money and Banking",
        description:
          "Money — functions and characteristics. Banking — commercial banks, central bank role. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C07",
        title: "Households and Firms",
        description:
          "Household spending and saving. Business objectives, revenue, costs and profit. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C08",
        title: "Firms and Labour",
        description:
          "Firm growth, economies and diseconomies of scale. Labour market — supply, demand and wages. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C09",
        title: "Trade Unions and Government",
        description:
          "Trade unions — role and effects. Government as producer, privatisation. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C10",
        title: "Macroeconomic Aims",
        description:
          "Government macroeconomic objectives — growth, employment, inflation, balance of payments. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C11",
        title: "Fiscal and Monetary Policy",
        description:
          "Fiscal policy — government spending and taxation. Monetary policy — interest rates. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C12",
        title: "Supply-Side Policy",
        description:
          "Supply-side policies, the business cycle and stabilisation. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
      {
        code: "S-ECO-C13",
        title: "Economic Development",
        description:
          "Differences in living standards, population growth, HDI, development strategies. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C14",
        title: "International Trade — Patterns and Theory",
        description:
          "Specialisation, comparative advantage, exports, imports and balance of trade. Applicable: Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics.",
      },
      {
        code: "S-ECO-C15",
        title: "International Trade — Protection and Exchange Rates",
        description:
          "Protectionism — tariffs, quotas, subsidies. Exchange rates — floating, fixed, managed float. Applicable: Cambridge O-Level 2281, IGCSE 0455.",
      },
    ],
  },
  {
    id: "business-studies",
    name: "Business Studies",
    label: "Business Studies | O-Level 7115 / IGCSE 0450",
    abbreviation: "BUS",
    colour: "#D97706",
    courses: [
      {
        code: "S-BUS-C01",
        title: "Understanding Business Activity",
        description:
          "What is business, business objectives, ownership types, business growth, the role of stakeholders. Applicable: Cambridge O-Level 7115, IGCSE 0450, IB MYP Business.",
      },
      {
        code: "S-BUS-C02",
        title: "People in Business",
        description:
          "Organisational structure, motivation theories, leadership styles, recruitment, training and appraisal. Applicable: Cambridge O-Level 7115, IGCSE 0450.",
      },
      {
        code: "S-BUS-C03",
        title: "Marketing",
        description:
          "Market research, the marketing mix, product life cycle, segmentation, Boston Matrix. Applicable: Cambridge O-Level 7115, IGCSE 0450, IB MYP Business.",
      },
      {
        code: "S-BUS-C04",
        title: "Operations Management",
        description:
          "Production methods, inventory management, quality control, location decisions, technology in production. Applicable: Cambridge O-Level 7115, IGCSE 0450.",
      },
      {
        code: "S-BUS-C05",
        title: "Financial Information and Decisions",
        description:
          "Income statement, balance sheet, financial ratios, budgeting, cash flow, sources of finance. Applicable: Cambridge O-Level 7115, IGCSE 0450, IB MYP Business.",
      },
      {
        code: "S-BUS-C06",
        title: "External Influences on Business",
        description:
          "Government economic policy, legal framework, environmental and ethical considerations, globalisation. Applicable: Cambridge O-Level 7115, IGCSE 0450, IB MYP Business.",
      },
    ],
  },
  {
    id: "pakistan-studies",
    name: "Pakistan Studies",
    label: "Pakistan Studies | O-Level 2059",
    abbreviation: "PKS",
    colour: "#1E3A5F",
    courses: [
      {
        code: "S-PKS-P1",
        title: "Pakistan Studies — Paper 1: History and Culture",
        description:
          "Complete Paper 1 course for Cambridge O-Level Pakistan Studies (2059). Pakistani history and culture from the Mughal Empire through independence. All frequently examined topics included.",
      },
      {
        code: "S-PKS-P2",
        title: "Pakistan Studies — Paper 2: Environment of Pakistan",
        description:
          "Complete Paper 2 course for Cambridge O-Level Pakistan Studies (2059). Physical environment, climate, natural resources, agriculture and industry. Data response and map work skills.",
      },
    ],
  },
  {
    id: "islamiyat",
    name: "Islamiyat",
    label: "Islamiyat | O-Level 2058",
    abbreviation: "ISL",
    colour: "#166534",
    courses: [
      {
        code: "S-ISL-P1-1",
        title: "Islamiyat Paper 1 — Quranic Passages",
        paper: "Paper 1",
        description:
          "Prescribed Quranic passages — translation, context, commentary and significance. Cambridge O-Level Islamiyat (2058) Paper 1.",
      },
      {
        code: "S-ISL-P1-2",
        title: "Islamiyat Paper 1 — The First Islamic Community",
        paper: "Paper 1",
        description:
          "Origins and development of the first Muslim community in Makkah and Madinah. Cambridge O-Level Islamiyat Paper 1.",
      },
      {
        code: "S-ISL-P1-3",
        title: "Islamiyat Paper 1 — Life of Prophet Muhammad (PBUH)",
        paper: "Paper 1",
        description:
          "The Prophet's life — major events, character and significance. Cambridge O-Level Islamiyat Paper 1.",
      },
      {
        code: "S-ISL-P1-4",
        title: "Islamiyat Paper 1 — History and Importance of the Quran",
        paper: "Paper 1",
        description:
          "Revelation, compilation, preservation and significance of the Quran. Cambridge O-Level Islamiyat Paper 1.",
      },
      {
        code: "S-ISL-P2-1",
        title: "Islamiyat Paper 2 — Articles of Faith and Pillars",
        paper: "Paper 2",
        description:
          "Six Articles of Faith and Five Pillars — foundations, significance and practice. Cambridge O-Level Islamiyat Paper 2.",
      },
      {
        code: "S-ISL-P2-2",
        title: "Islamiyat Paper 2 — The Rightly Guided Caliphs",
        paper: "Paper 2",
        description:
          "The four Caliphs — events, leadership qualities and importance. Cambridge O-Level Islamiyat Paper 2.",
      },
      {
        code: "S-ISL-P2-3",
        title: "Islamiyat Paper 2 — History of Hadith",
        paper: "Paper 2",
        description:
          "Classification, collection, preservation and significance of Hadith literature. Cambridge O-Level Islamiyat Paper 2.",
      },
      {
        code: "S-ISL-P2-4",
        title: "Islamiyat Paper 2 — Major Teachings of Hadith",
        paper: "Paper 2",
        description:
          "Key themes and moral teachings from Hadith. Cambridge O-Level Islamiyat Paper 2.",
      },
    ],
  },
  {
    id: "urdu",
    name: "Urdu",
    label: "Urdu | O-Level 3248",
    abbreviation: "URD",
    colour: "#BE185D",
    courses: [
      {
        code: "S-URD-1",
        title: "Urdu — Essay Writing",
        description:
          "Structured Urdu essay writing — argument construction, paragraph development and language precision for Cambridge O-Level Urdu (3248).",
      },
      {
        code: "S-URD-2",
        title: "Urdu — Email, Application and Letter Writing",
        description:
          "Format-correct Urdu correspondence — formal letters, emails and applications at Cambridge O-Level standard.",
      },
      {
        code: "S-URD-3",
        title: "Urdu — Translation (English to Urdu)",
        description:
          "Translation skills — converting English paragraphs into accurate, idiomatic Urdu at O-Level standard.",
      },
    ],
  },
  {
    id: "english-language",
    name: "English Language",
    label: "English Language | O-Level 1123 / IGCSE 0500",
    abbreviation: "ENG",
    colour: "#1D4ED8",
    courses: [
      {
        code: "S-ENG-OL",
        title: "O-Level English Language (1123)",
        description:
          "Complete Cambridge O-Level English Language preparation. Paper 1 reading and directed writing, Paper 2 writing and summary. See the English Language Pathway page for the complete course sequence leading to this level. EduMeUp offers a complete English Language progression pathway — from Grade 6 foundation through ESL1, ESL2, Bridge English to O-Level English mastery. See the English Language Pathway page for the complete sequence and the free diagnostic entry tool.",
        secondaryLink: {
          label: "View Full English Pathway →",
          href: "/programs/english-pathway",
        },
      },
    ],
  },
];

const heroStats = [
  "10 Subjects",
  "114 Topic Courses",
  "Cambridge O-Level and IGCSE Aligned",
];

function scrollToSubject(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function scrollCourseTrack(subjectId: string, direction: "left" | "right") {
  document.getElementById(`${subjectId}-track`)?.scrollBy({
    left: direction === "left" ? -580 : 580,
    behavior: "smooth",
  });
}

function CoursePopup({
  course,
  subject,
}: {
  course: Course;
  subject: SubjectRow;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
      <div className="px-5 py-4 text-white" style={{ backgroundColor: subject.colour }}>
        <p className="text-xs font-bold uppercase tracking-widest">{course.code}</p>
        <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
          {course.title}
        </h3>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-sm leading-relaxed text-slate-700">{course.description}</p>
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <p className="text-sm font-semibold text-brand-navy">Price: See pricing</p>
          <a
            href="/enrol"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-primary-dark"
          >
            Enrol
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        {course.secondaryLink && (
          <Link href={course.secondaryLink.href}>
            <span className="inline-flex cursor-pointer items-center text-sm font-semibold text-brand-primary hover:text-brand-primary-dark">
              {course.secondaryLink.label}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  subject,
  index,
  total,
  onMobileOpen,
}: {
  course: Course;
  subject: SubjectRow;
  index: number;
  total: number;
  onMobileOpen: () => void;
}) {
  const popupPosition =
    index >= total - 2
      ? "right-full mr-4 origin-right"
      : "left-full ml-4 origin-left";

  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        onClick={onMobileOpen}
        className="flex h-[200px] w-[272px] flex-col rounded-[10px] border border-slate-200 bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:h-[320px]"
        style={{ borderTop: `4px solid ${subject.colour}` }}
      >
        <span
          className="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: subject.colour }}
        >
          {subject.abbreviation}
        </span>

        {course.paper && (
          <span className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            {course.paper}
          </span>
        )}

        <h3
          className="text-base font-semibold leading-snug text-brand-navy"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {course.title}
        </h3>

        <p
          className="mt-3 text-[13px] leading-relaxed text-slate-600"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {course.description}
        </p>

        <span className="mt-auto inline-flex w-fit items-center rounded-full bg-brand-primary px-4 py-2 text-xs font-bold text-white">
          Enrol
        </span>
      </button>

      <div
        className={`pointer-events-none absolute top-0 z-50 hidden w-[360px] opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 lg:block ${popupPosition}`}
      >
        <CoursePopup course={course} subject={subject} />
      </div>
    </div>
  );
}

function DiagnosticCta() {
  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-brand-navy md:text-3xl">
            Not Sure Which Topic to Start With?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
            Take the free AI Diagnostic for any subject. It identifies exactly
            which topics you already know and which to study first — so you
            enrol in the right courses and not the ones you do not need.
          </p>
        </div>
        <Link href="/programs/ai-diagnostic">
          <span className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-dark">
            TAKE FREE DIAGNOSTIC
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function SubjectCourseRow({
  subject,
  onMobileOpen,
}: {
  subject: SubjectRow;
  onMobileOpen: (subject: SubjectRow, course: Course) => void;
}) {
  const paperOne = subject.courses.filter((course) => course.paper === "Paper 1");
  const paperTwo = subject.courses.filter((course) => course.paper === "Paper 2");
  const groupedCourses =
    subject.id === "islamiyat"
      ? [
          { label: "Paper 1", courses: paperOne },
          { label: "Paper 2", courses: paperTwo },
        ]
      : [{ label: "", courses: subject.courses }];

  let renderedIndex = 0;

  return (
    <section id={subject.id} className="scroll-mt-28">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div
          className="flex min-h-[88px] w-full items-center rounded-xl px-5 py-4 text-white lg:sticky lg:left-0 lg:top-28 lg:min-h-[320px] lg:w-[200px] lg:shrink-0"
          style={{ backgroundColor: subject.colour }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">
              {subject.abbreviation}
            </p>
            <h2 className="mt-2 text-xl font-semibold leading-tight text-white">
              {subject.name}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-white/80">{subject.label}</p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="group/row relative">
            <button
              type="button"
              aria-label={`Scroll ${subject.name} courses left`}
              onClick={() => scrollCourseTrack(subject.id, "left")}
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-md opacity-100 transition hover:bg-blue-50 lg:opacity-0 lg:group-hover/row:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div
              id={`${subject.id}-track`}
              className="flex snap-x gap-[18px] overflow-x-auto scroll-smooth pb-4 pl-1 pr-14"
            >
              {groupedCourses.map((group) => (
                <div key={group.label || subject.id} className="flex shrink-0 gap-[18px]">
                  {group.label && (
                    <div className="flex w-20 shrink-0 flex-col items-center justify-center text-center">
                      <div className="h-px w-full bg-slate-200" />
                      <span className="my-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                        {group.label}
                      </span>
                      <div className="h-px w-full bg-slate-200" />
                    </div>
                  )}

                  {group.courses.map((course) => {
                    const currentIndex = renderedIndex;
                    renderedIndex += 1;
                    return (
                      <CourseCard
                        key={course.code}
                        course={course}
                        subject={subject}
                        index={currentIndex}
                        total={subject.courses.length}
                        onMobileOpen={() => onMobileOpen(subject, course)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label={`Scroll ${subject.name} courses right`}
              onClick={() => scrollCourseTrack(subject.id, "right")}
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-md opacity-100 transition hover:bg-blue-50 lg:opacity-0 lg:group-hover/row:opacity-100"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CompleteOLevel() {
  const [activeSubject, setActiveSubject] = useState(subjectRows[0].id);
  const [mobilePopup, setMobilePopup] = useState<{
    subject: SubjectRow;
    course: Course;
  } | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "O-Level Subject Courses — Every Subject, Every Topic | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Ten Cambridge O-Level and IGCSE subjects structured by topic. Browse 114 topic courses across Mathematics, Physics, Chemistry, Biology, Economics, Business Studies, Pakistan Studies, Islamiyat, Urdu, and English Language.",
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSubject(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
    );

    subjectRows.forEach((subject) => {
      const element = document.getElementById(subject.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-5xl text-center"
          >
            <span className="inline-block rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary">
              Cambridge O-Level / IGCSE | Grade 6 through O-Level | All subjects
            </span>

            <h1 className="mt-5 text-4xl font-semibold text-slate-900 md:text-6xl">
              O-Level Subject Courses — Every Subject, Every Topic
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
              Ten subjects. Structured by topic. Each course follows the 8-step
              mastery cycle — diagnostic first, interactive learning, spaced
              retrieval, past paper application. Enrol in one topic, several, or
              the complete subject.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat}
                  className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
                >
                  <p className="text-base font-bold text-brand-primary">{stat}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark">
                  TAKE FREE DIAGNOSTIC — FIND YOUR STARTING POINT
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => scrollToSubject("mathematics")}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-primary bg-white px-6 py-3 text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary-soft"
              >
                BROWSE BY SUBJECT
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-4">
        <div className="container-custom">
          <p className="mx-auto max-w-5xl text-center text-xs font-medium leading-relaxed text-brand-navy">
            These courses are designed for Cambridge O-Level and IGCSE
            examinations — and are equally applicable to other international
            secondary education systems based on conceptual understanding and
            unseen exam application, including IB MYP, UAE national curriculum,
            Malaysian O-Level and African O-Level frameworks.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold leading-relaxed text-brand-navy">
                  Take the free AI Diagnostic for any subject — identify your
                  starting topic before you enrol.
                </p>
                <Link href="/programs/ai-diagnostic">
                  <span className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-brand-primary-dark">
                    TAKE FREE DIAGNOSTIC
                  </span>
                </Link>
              </div>

              <nav className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Subject Anchor Navigation
                </p>
                <div className="space-y-1">
                  {subjectRows.map((subject) => (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => scrollToSubject(subject.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                        activeSubject === subject.id
                          ? "bg-brand-primary text-white"
                          : "text-slate-700 hover:bg-blue-50 hover:text-brand-primary"
                      }`}
                    >
                      {subject.name}
                      <span className="text-xs">{subject.courses.length}</span>
                    </button>
                  ))}
                </div>
              </nav>

              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <p className="text-sm leading-relaxed text-slate-700">
                  You can enrol in one topic, a group of topics, or the full
                  subject. Each topic course is a complete standalone programme.
                </p>
                <Link href="/pricing">
                  <span className="mt-4 inline-flex cursor-pointer items-center text-sm font-bold text-brand-primary hover:text-brand-primary-dark">
                    VIEW PRICING
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </div>
            </aside>

            <div id="subjects" className="min-w-0 space-y-10">
              {subjectRows.map((subject, index) => (
                <div key={subject.id} className="space-y-10">
                  <SubjectCourseRow
                    subject={subject}
                    onMobileOpen={(row, course) =>
                      setMobilePopup({ subject: row, course })
                    }
                  />
                  {index === 4 && <DiagnosticCta />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-4xl text-3xl font-semibold text-white md:text-4xl">
            Every Subject. Every Topic. One Research-Backed Method.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-blue-100">
            All courses on this page follow the EduMeUp 8-step mastery cycle.
            Diagnostic first. Interactive learning. Spaced retrieval. Cambridge
            examiner insight. Enrol in one topic or build a complete subject
            programme — the same method applies throughout.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/programs/ai-diagnostic">
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-primary px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark">
                TAKE FREE DIAGNOSTIC
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/programs/bridge-courses">
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-300 bg-transparent px-7 py-3.5 text-sm font-bold text-blue-100 transition hover:border-white hover:text-white">
                BROWSE BRIDGE COURSES — PRE-O-LEVEL FOUNDATION
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <a
            href="https://wa.me/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Questions about which courses suit your level? Talk to us on WhatsApp →
          </a>
        </div>
      </section>

      {mobilePopup && (
        <div className="fixed inset-0 z-[80] bg-slate-950/45 lg:hidden">
          <button
            type="button"
            aria-label="Close course details"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setMobilePopup(null)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl">
            <CoursePopup
              course={mobilePopup.course}
              subject={mobilePopup.subject}
            />
            <button
              type="button"
              onClick={() => setMobilePopup(null)}
              className="w-full border-t border-slate-100 px-5 py-4 text-sm font-bold text-brand-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
