// @ts-nocheck

/* Object Literal Syntax */
type JSONResponse = {
  version: number;
  /** In bytes */
  payloadSize: number;
  outOfStock?: boolean;
  update: (retryTimes: number) => void;
  (): JSONResponse;
  readonly body: string;
};

/* Primitive Type */
type SanitizedInput = string;
type MissingNo = 404;

/* Object Literal Type */
type Point = {
  x: number;
  y: number;
};

/* Tuple Type */
type Data = [location: Location, timestamp: string];

/* Union Type */
type Size = 'small' | 'medium' | 'large';

/* Intersection Types */
type PointAlso = { x: number } & { y: number };

/* Type Indexing */
type SomeResponse = { data: {} };
type SomeData = SomeResponse['data'];

/* Type from Func Return */
const createFixtures = () => {};

type Fixtures = ReturnType<typeof createFixtures>;

function test(fixture: Fixtures) {}

/* Mapped Types */
type Artist = { name: string; bio: string };
type Subscriber<Type> = {
  [Property in keyof Type]: (newValue: Type[Property]) => void;
};
type ArtistSub = Subscriber<Artist>;

/* Conditional Types */
type HasFourLegs<Animal> = Animal extends { legs: 4 } ? Animal : never;
type Animals = Bird | Dog | Ant | Wolf;
type FourLegs = HasFourLegs<Animals>;

/* Template Union Types */
type SupportedLangs = 'en' | 'pt' | 'zh';
type FooterLocaleIDs = 'header' | 'footer';
type AllLocaleIDs = `${SupportedLangs}_${FooterLocaleIDs}_id`;
