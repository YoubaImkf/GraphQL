
const doctorsData = [
  {
    id: '1',
    name: 'Samia Mekame',
    speciality: 'OPHTALMOLOGIST',
  },
  {
    id: '2',
    name: 'Catherine Bedoy',
    speciality: 'PSYCHOLOGIST',
  },
];

const colorsArray = ["#FF5733", "#33FF57", "#3357FF"];

export const resolvers = {
  Query: {
    doctors: (parent, args, context, info) => doctorsData,
    doctor: (parent, args, context, info) => {
      const id = args.id
      return doctorsData.find(d => d.id === id)
    },
    doctorsBySpecility: (parent, args, context, info) => {
      console.log(args)
      if (args.specialities && args.specialities.length > 0) {
        return doctorsData.filter(doctor => args.specialities.includes(doctor.speciality))
      }
      return doctorsData
    },
    add: (parent, { number1, number2 }) => number1 + number2,
    substract: (parent, { number1, number2 }) => number1 - number2,
    multiply: (parent, { number1, number2 }) => number1 * number2,
    divide: (parent, { number1, number2 }) => {
      if (number2 === 0)
        throw new Error("Can't devide by zero")

      return number1 / number2;
    },
    closestColor: (parent, args, context, info) => {
      const hexColor = args.hexColor;
      if (!isValidHexColor(hexColor)) {
        throw new Error("Invalid hexadecimal color value.");
      }

      const closest = findClosestColor(hexColor, colorsArray);
      return closest;
    }
  },

  Doctor: {
    addresses: (parent, args, context, info) => {
      return []
    }
  }
};


/**
 * COLOR SECTION 
 */
function isValidHexColor(color: string): boolean {
  const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
  return hexColorRegex.test(color);
}

function findClosestColor(color: string, colors: string[]): string {
  const inputRgb = hexToRgb(color);
  let minDistance = Number.MAX_VALUE;
  let closestColor = '';

  for (const col of colors) {
    const colRgb = hexToRgb(col);
    const distance = calculateColorDistance(inputRgb, colRgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = col;
    }
  }

  return closestColor;
}

function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function calculateColorDistance(color1: [number, number, number], color2: [number, number, number]): number {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
}