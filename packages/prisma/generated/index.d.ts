
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model Business
 * 
 */
export type Business = $Result.DefaultSelection<Prisma.$BusinessPayload>
/**
 * Model BusinessMember
 * 
 */
export type BusinessMember = $Result.DefaultSelection<Prisma.$BusinessMemberPayload>
/**
 * Model ServiceCategory
 * 
 */
export type ServiceCategory = $Result.DefaultSelection<Prisma.$ServiceCategoryPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model EmployeeService
 * 
 */
export type EmployeeService = $Result.DefaultSelection<Prisma.$EmployeeServicePayload>
/**
 * Model AuthProvider
 * 
 */
export type AuthProvider = $Result.DefaultSelection<Prisma.$AuthProviderPayload>
/**
 * Model UserCredential
 * 
 */
export type UserCredential = $Result.DefaultSelection<Prisma.$UserCredentialPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model LoginAttempt
 * 
 */
export type LoginAttempt = $Result.DefaultSelection<Prisma.$LoginAttemptPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthProviderType: {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD'
};

export type AuthProviderType = (typeof AuthProviderType)[keyof typeof AuthProviderType]


export const BusinessRole: {
  OWNER: 'OWNER'
};

export type BusinessRole = (typeof BusinessRole)[keyof typeof BusinessRole]

}

export type AuthProviderType = $Enums.AuthProviderType

export const AuthProviderType: typeof $Enums.AuthProviderType

export type BusinessRole = $Enums.BusinessRole

export const BusinessRole: typeof $Enums.BusinessRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AdminUsers
 * const adminUsers = await prisma.adminUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AdminUsers
   * const adminUsers = await prisma.adminUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.business`: Exposes CRUD operations for the **Business** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Businesses
    * const businesses = await prisma.business.findMany()
    * ```
    */
  get business(): Prisma.BusinessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businessMember`: Exposes CRUD operations for the **BusinessMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessMembers
    * const businessMembers = await prisma.businessMember.findMany()
    * ```
    */
  get businessMember(): Prisma.BusinessMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceCategory`: Exposes CRUD operations for the **ServiceCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceCategories
    * const serviceCategories = await prisma.serviceCategory.findMany()
    * ```
    */
  get serviceCategory(): Prisma.ServiceCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeService`: Exposes CRUD operations for the **EmployeeService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeServices
    * const employeeServices = await prisma.employeeService.findMany()
    * ```
    */
  get employeeService(): Prisma.EmployeeServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authProvider`: Exposes CRUD operations for the **AuthProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthProviders
    * const authProviders = await prisma.authProvider.findMany()
    * ```
    */
  get authProvider(): Prisma.AuthProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCredential`: Exposes CRUD operations for the **UserCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCredentials
    * const userCredentials = await prisma.userCredential.findMany()
    * ```
    */
  get userCredential(): Prisma.UserCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loginAttempt`: Exposes CRUD operations for the **LoginAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoginAttempts
    * const loginAttempts = await prisma.loginAttempt.findMany()
    * ```
    */
  get loginAttempt(): Prisma.LoginAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AdminUser: 'AdminUser',
    Business: 'Business',
    BusinessMember: 'BusinessMember',
    ServiceCategory: 'ServiceCategory',
    Service: 'Service',
    Employee: 'Employee',
    EmployeeService: 'EmployeeService',
    AuthProvider: 'AuthProvider',
    UserCredential: 'UserCredential',
    RefreshToken: 'RefreshToken',
    LoginAttempt: 'LoginAttempt',
    PasswordResetToken: 'PasswordResetToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "adminUser" | "business" | "businessMember" | "serviceCategory" | "service" | "employee" | "employeeService" | "authProvider" | "userCredential" | "refreshToken" | "loginAttempt" | "passwordResetToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      Business: {
        payload: Prisma.$BusinessPayload<ExtArgs>
        fields: Prisma.BusinessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findFirst: {
            args: Prisma.BusinessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findMany: {
            args: Prisma.BusinessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          create: {
            args: Prisma.BusinessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          createMany: {
            args: Prisma.BusinessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          delete: {
            args: Prisma.BusinessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          update: {
            args: Prisma.BusinessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          deleteMany: {
            args: Prisma.BusinessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          upsert: {
            args: Prisma.BusinessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          aggregate: {
            args: Prisma.BusinessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusiness>
          }
          groupBy: {
            args: Prisma.BusinessGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessCountAggregateOutputType> | number
          }
        }
      }
      BusinessMember: {
        payload: Prisma.$BusinessMemberPayload<ExtArgs>
        fields: Prisma.BusinessMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>
          }
          findFirst: {
            args: Prisma.BusinessMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>
          }
          findMany: {
            args: Prisma.BusinessMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>[]
          }
          create: {
            args: Prisma.BusinessMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>
          }
          createMany: {
            args: Prisma.BusinessMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>[]
          }
          delete: {
            args: Prisma.BusinessMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>
          }
          update: {
            args: Prisma.BusinessMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>
          }
          deleteMany: {
            args: Prisma.BusinessMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>[]
          }
          upsert: {
            args: Prisma.BusinessMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessMemberPayload>
          }
          aggregate: {
            args: Prisma.BusinessMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessMember>
          }
          groupBy: {
            args: Prisma.BusinessMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessMemberCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessMemberCountAggregateOutputType> | number
          }
        }
      }
      ServiceCategory: {
        payload: Prisma.$ServiceCategoryPayload<ExtArgs>
        fields: Prisma.ServiceCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          findFirst: {
            args: Prisma.ServiceCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          findMany: {
            args: Prisma.ServiceCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          create: {
            args: Prisma.ServiceCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          createMany: {
            args: Prisma.ServiceCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          delete: {
            args: Prisma.ServiceCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          update: {
            args: Prisma.ServiceCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ServiceCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ServiceCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceCategoryPayload>
          }
          aggregate: {
            args: Prisma.ServiceCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceCategory>
          }
          groupBy: {
            args: Prisma.ServiceCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCategoryCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      EmployeeService: {
        payload: Prisma.$EmployeeServicePayload<ExtArgs>
        fields: Prisma.EmployeeServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          findFirst: {
            args: Prisma.EmployeeServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          findMany: {
            args: Prisma.EmployeeServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>[]
          }
          create: {
            args: Prisma.EmployeeServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          createMany: {
            args: Prisma.EmployeeServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>[]
          }
          delete: {
            args: Prisma.EmployeeServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          update: {
            args: Prisma.EmployeeServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeServicePayload>
          }
          aggregate: {
            args: Prisma.EmployeeServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeService>
          }
          groupBy: {
            args: Prisma.EmployeeServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeServiceCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeServiceCountAggregateOutputType> | number
          }
        }
      }
      AuthProvider: {
        payload: Prisma.$AuthProviderPayload<ExtArgs>
        fields: Prisma.AuthProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findFirst: {
            args: Prisma.AuthProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findMany: {
            args: Prisma.AuthProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          create: {
            args: Prisma.AuthProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          createMany: {
            args: Prisma.AuthProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          delete: {
            args: Prisma.AuthProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          update: {
            args: Prisma.AuthProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          deleteMany: {
            args: Prisma.AuthProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          upsert: {
            args: Prisma.AuthProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          aggregate: {
            args: Prisma.AuthProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthProvider>
          }
          groupBy: {
            args: Prisma.AuthProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthProviderCountArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderCountAggregateOutputType> | number
          }
        }
      }
      UserCredential: {
        payload: Prisma.$UserCredentialPayload<ExtArgs>
        fields: Prisma.UserCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>
          }
          findFirst: {
            args: Prisma.UserCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>
          }
          findMany: {
            args: Prisma.UserCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>[]
          }
          create: {
            args: Prisma.UserCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>
          }
          createMany: {
            args: Prisma.UserCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>[]
          }
          delete: {
            args: Prisma.UserCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>
          }
          update: {
            args: Prisma.UserCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>
          }
          deleteMany: {
            args: Prisma.UserCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>[]
          }
          upsert: {
            args: Prisma.UserCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCredentialPayload>
          }
          aggregate: {
            args: Prisma.UserCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCredential>
          }
          groupBy: {
            args: Prisma.UserCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<UserCredentialCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      LoginAttempt: {
        payload: Prisma.$LoginAttemptPayload<ExtArgs>
        fields: Prisma.LoginAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoginAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoginAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          findFirst: {
            args: Prisma.LoginAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoginAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          findMany: {
            args: Prisma.LoginAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>[]
          }
          create: {
            args: Prisma.LoginAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          createMany: {
            args: Prisma.LoginAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoginAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>[]
          }
          delete: {
            args: Prisma.LoginAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          update: {
            args: Prisma.LoginAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          deleteMany: {
            args: Prisma.LoginAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoginAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoginAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>[]
          }
          upsert: {
            args: Prisma.LoginAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginAttemptPayload>
          }
          aggregate: {
            args: Prisma.LoginAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoginAttempt>
          }
          groupBy: {
            args: Prisma.LoginAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoginAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoginAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<LoginAttemptCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    adminUser?: AdminUserOmit
    business?: BusinessOmit
    businessMember?: BusinessMemberOmit
    serviceCategory?: ServiceCategoryOmit
    service?: ServiceOmit
    employee?: EmployeeOmit
    employeeService?: EmployeeServiceOmit
    authProvider?: AuthProviderOmit
    userCredential?: UserCredentialOmit
    refreshToken?: RefreshTokenOmit
    loginAttempt?: LoginAttemptOmit
    passwordResetToken?: PasswordResetTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminUserCountOutputType
   */

  export type AdminUserCountOutputType = {
    authProviders: number
    refreshTokens: number
    passwordResetTokens: number
    businessMembers: number
  }

  export type AdminUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProviders?: boolean | AdminUserCountOutputTypeCountAuthProvidersArgs
    refreshTokens?: boolean | AdminUserCountOutputTypeCountRefreshTokensArgs
    passwordResetTokens?: boolean | AdminUserCountOutputTypeCountPasswordResetTokensArgs
    businessMembers?: boolean | AdminUserCountOutputTypeCountBusinessMembersArgs
  }

  // Custom InputTypes
  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUserCountOutputType
     */
    select?: AdminUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountAuthProvidersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthProviderWhereInput
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountBusinessMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessMemberWhereInput
  }


  /**
   * Count Type BusinessCountOutputType
   */

  export type BusinessCountOutputType = {
    businessMembers: number
    serviceCategories: number
    services: number
    employees: number
  }

  export type BusinessCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    businessMembers?: boolean | BusinessCountOutputTypeCountBusinessMembersArgs
    serviceCategories?: boolean | BusinessCountOutputTypeCountServiceCategoriesArgs
    services?: boolean | BusinessCountOutputTypeCountServicesArgs
    employees?: boolean | BusinessCountOutputTypeCountEmployeesArgs
  }

  // Custom InputTypes
  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessCountOutputType
     */
    select?: BusinessCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountBusinessMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessMemberWhereInput
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountServiceCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceCategoryWhereInput
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }


  /**
   * Count Type ServiceCategoryCountOutputType
   */

  export type ServiceCategoryCountOutputType = {
    services: number
  }

  export type ServiceCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceCategoryCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCategoryCountOutputType without action
   */
  export type ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategoryCountOutputType
     */
    select?: ServiceCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCategoryCountOutputType without action
   */
  export type ServiceCategoryCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    employeeServices: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employeeServices?: boolean | ServiceCountOutputTypeCountEmployeeServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountEmployeeServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeServiceWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    employeeServices: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employeeServices?: boolean | EmployeeCountOutputTypeCountEmployeeServicesArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountEmployeeServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeServiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    emailVerifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    emailVerifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    emailVerifiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    emailVerifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    emailVerifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    emailVerifiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    email: string | null
    firstName: string | null
    lastName: string | null
    emailVerifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    emailVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authProviders?: boolean | AdminUser$authProvidersArgs<ExtArgs>
    refreshTokens?: boolean | AdminUser$refreshTokensArgs<ExtArgs>
    passwordResetTokens?: boolean | AdminUser$passwordResetTokensArgs<ExtArgs>
    businessMembers?: boolean | AdminUser$businessMembersArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    emailVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    emailVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    emailVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "emailVerifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["adminUser"]>
  export type AdminUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProviders?: boolean | AdminUser$authProvidersArgs<ExtArgs>
    refreshTokens?: boolean | AdminUser$refreshTokensArgs<ExtArgs>
    passwordResetTokens?: boolean | AdminUser$passwordResetTokensArgs<ExtArgs>
    businessMembers?: boolean | AdminUser$businessMembersArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AdminUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {
      authProviders: Prisma.$AuthProviderPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
      businessMembers: Prisma.$BusinessMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      firstName: string | null
      lastName: string | null
      emailVerifiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers and returns the data updated in the database.
     * @param {AdminUserUpdateManyAndReturnArgs} args - Arguments to update many AdminUsers.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authProviders<T extends AdminUser$authProvidersArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$authProvidersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends AdminUser$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordResetTokens<T extends AdminUser$passwordResetTokensArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businessMembers<T extends AdminUser$businessMembersArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$businessMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly firstName: FieldRef<"AdminUser", 'String'>
    readonly lastName: FieldRef<"AdminUser", 'String'>
    readonly emailVerifiedAt: FieldRef<"AdminUser", 'DateTime'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser updateManyAndReturn
   */
  export type AdminUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUser.authProviders
   */
  export type AdminUser$authProvidersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    where?: AuthProviderWhereInput
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    cursor?: AuthProviderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AdminUser.refreshTokens
   */
  export type AdminUser$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * AdminUser.passwordResetTokens
   */
  export type AdminUser$passwordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    cursor?: PasswordResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * AdminUser.businessMembers
   */
  export type AdminUser$businessMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    where?: BusinessMemberWhereInput
    orderBy?: BusinessMemberOrderByWithRelationInput | BusinessMemberOrderByWithRelationInput[]
    cursor?: BusinessMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessMemberScalarFieldEnum | BusinessMemberScalarFieldEnum[]
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
  }


  /**
   * Model Business
   */

  export type AggregateBusiness = {
    _count: BusinessCountAggregateOutputType | null
    _avg: BusinessAvgAggregateOutputType | null
    _sum: BusinessSumAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  export type BusinessAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type BusinessSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type BusinessMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    logoPath: string | null
    imagePath: string | null
    phone: string | null
    email: string | null
    website: string | null
    telegram: string | null
    vk: string | null
    youtube: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    logoPath: string | null
    imagePath: string | null
    phone: string | null
    email: string | null
    website: string | null
    telegram: string | null
    vk: string | null
    youtube: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessCountAggregateOutputType = {
    id: number
    name: number
    description: number
    logoPath: number
    imagePath: number
    phone: number
    email: number
    website: number
    telegram: number
    vk: number
    youtube: number
    address: number
    latitude: number
    longitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type BusinessSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type BusinessMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logoPath?: true
    imagePath?: true
    phone?: true
    email?: true
    website?: true
    telegram?: true
    vk?: true
    youtube?: true
    address?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logoPath?: true
    imagePath?: true
    phone?: true
    email?: true
    website?: true
    telegram?: true
    vk?: true
    youtube?: true
    address?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logoPath?: true
    imagePath?: true
    phone?: true
    email?: true
    website?: true
    telegram?: true
    vk?: true
    youtube?: true
    address?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Business to aggregate.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Businesses
    **/
    _count?: true | BusinessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusinessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusinessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessMaxAggregateInputType
  }

  export type GetBusinessAggregateType<T extends BusinessAggregateArgs> = {
        [P in keyof T & keyof AggregateBusiness]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusiness[P]>
      : GetScalarType<T[P], AggregateBusiness[P]>
  }




  export type BusinessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessWhereInput
    orderBy?: BusinessOrderByWithAggregationInput | BusinessOrderByWithAggregationInput[]
    by: BusinessScalarFieldEnum[] | BusinessScalarFieldEnum
    having?: BusinessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessCountAggregateInputType | true
    _avg?: BusinessAvgAggregateInputType
    _sum?: BusinessSumAggregateInputType
    _min?: BusinessMinAggregateInputType
    _max?: BusinessMaxAggregateInputType
  }

  export type BusinessGroupByOutputType = {
    id: string
    name: string | null
    description: string | null
    logoPath: string | null
    imagePath: string | null
    phone: string | null
    email: string | null
    website: string | null
    telegram: string | null
    vk: string | null
    youtube: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: BusinessCountAggregateOutputType | null
    _avg: BusinessAvgAggregateOutputType | null
    _sum: BusinessSumAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  type GetBusinessGroupByPayload<T extends BusinessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessGroupByOutputType[P]>
        }
      >
    >


  export type BusinessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logoPath?: boolean
    imagePath?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    telegram?: boolean
    vk?: boolean
    youtube?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    businessMembers?: boolean | Business$businessMembersArgs<ExtArgs>
    serviceCategories?: boolean | Business$serviceCategoriesArgs<ExtArgs>
    services?: boolean | Business$servicesArgs<ExtArgs>
    employees?: boolean | Business$employeesArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logoPath?: boolean
    imagePath?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    telegram?: boolean
    vk?: boolean
    youtube?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logoPath?: boolean
    imagePath?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    telegram?: boolean
    vk?: boolean
    youtube?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    logoPath?: boolean
    imagePath?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    telegram?: boolean
    vk?: boolean
    youtube?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "logoPath" | "imagePath" | "phone" | "email" | "website" | "telegram" | "vk" | "youtube" | "address" | "latitude" | "longitude" | "createdAt" | "updatedAt", ExtArgs["result"]["business"]>
  export type BusinessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    businessMembers?: boolean | Business$businessMembersArgs<ExtArgs>
    serviceCategories?: boolean | Business$serviceCategoriesArgs<ExtArgs>
    services?: boolean | Business$servicesArgs<ExtArgs>
    employees?: boolean | Business$employeesArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BusinessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BusinessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BusinessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Business"
    objects: {
      businessMembers: Prisma.$BusinessMemberPayload<ExtArgs>[]
      serviceCategories: Prisma.$ServiceCategoryPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      employees: Prisma.$EmployeePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      description: string | null
      logoPath: string | null
      imagePath: string | null
      phone: string | null
      email: string | null
      website: string | null
      telegram: string | null
      vk: string | null
      youtube: string | null
      address: string | null
      latitude: number | null
      longitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["business"]>
    composites: {}
  }

  type BusinessGetPayload<S extends boolean | null | undefined | BusinessDefaultArgs> = $Result.GetResult<Prisma.$BusinessPayload, S>

  type BusinessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessCountAggregateInputType | true
    }

  export interface BusinessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Business'], meta: { name: 'Business' } }
    /**
     * Find zero or one Business that matches the filter.
     * @param {BusinessFindUniqueArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessFindUniqueArgs>(args: SelectSubset<T, BusinessFindUniqueArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Business that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessFindUniqueOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessFindFirstArgs>(args?: SelectSubset<T, BusinessFindFirstArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Businesses
     * const businesses = await prisma.business.findMany()
     * 
     * // Get first 10 Businesses
     * const businesses = await prisma.business.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessWithIdOnly = await prisma.business.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessFindManyArgs>(args?: SelectSubset<T, BusinessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Business.
     * @param {BusinessCreateArgs} args - Arguments to create a Business.
     * @example
     * // Create one Business
     * const Business = await prisma.business.create({
     *   data: {
     *     // ... data to create a Business
     *   }
     * })
     * 
     */
    create<T extends BusinessCreateArgs>(args: SelectSubset<T, BusinessCreateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Businesses.
     * @param {BusinessCreateManyArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessCreateManyArgs>(args?: SelectSubset<T, BusinessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Businesses and returns the data saved in the database.
     * @param {BusinessCreateManyAndReturnArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Business.
     * @param {BusinessDeleteArgs} args - Arguments to delete one Business.
     * @example
     * // Delete one Business
     * const Business = await prisma.business.delete({
     *   where: {
     *     // ... filter to delete one Business
     *   }
     * })
     * 
     */
    delete<T extends BusinessDeleteArgs>(args: SelectSubset<T, BusinessDeleteArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Business.
     * @param {BusinessUpdateArgs} args - Arguments to update one Business.
     * @example
     * // Update one Business
     * const business = await prisma.business.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUpdateArgs>(args: SelectSubset<T, BusinessUpdateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Businesses.
     * @param {BusinessDeleteManyArgs} args - Arguments to filter Businesses to delete.
     * @example
     * // Delete a few Businesses
     * const { count } = await prisma.business.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessDeleteManyArgs>(args?: SelectSubset<T, BusinessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUpdateManyArgs>(args: SelectSubset<T, BusinessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses and returns the data updated in the database.
     * @param {BusinessUpdateManyAndReturnArgs} args - Arguments to update many Businesses.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Business.
     * @param {BusinessUpsertArgs} args - Arguments to update or create a Business.
     * @example
     * // Update or create a Business
     * const business = await prisma.business.upsert({
     *   create: {
     *     // ... data to create a Business
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Business we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUpsertArgs>(args: SelectSubset<T, BusinessUpsertArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessCountArgs} args - Arguments to filter Businesses to count.
     * @example
     * // Count the number of Businesses
     * const count = await prisma.business.count({
     *   where: {
     *     // ... the filter for the Businesses we want to count
     *   }
     * })
    **/
    count<T extends BusinessCountArgs>(
      args?: Subset<T, BusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessAggregateArgs>(args: Subset<T, BusinessAggregateArgs>): Prisma.PrismaPromise<GetBusinessAggregateType<T>>

    /**
     * Group by Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessGroupByArgs['orderBy'] }
        : { orderBy?: BusinessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Business model
   */
  readonly fields: BusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Business.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    businessMembers<T extends Business$businessMembersArgs<ExtArgs> = {}>(args?: Subset<T, Business$businessMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    serviceCategories<T extends Business$serviceCategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Business$serviceCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Business$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Business$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    employees<T extends Business$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Business$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Business model
   */
  interface BusinessFieldRefs {
    readonly id: FieldRef<"Business", 'String'>
    readonly name: FieldRef<"Business", 'String'>
    readonly description: FieldRef<"Business", 'String'>
    readonly logoPath: FieldRef<"Business", 'String'>
    readonly imagePath: FieldRef<"Business", 'String'>
    readonly phone: FieldRef<"Business", 'String'>
    readonly email: FieldRef<"Business", 'String'>
    readonly website: FieldRef<"Business", 'String'>
    readonly telegram: FieldRef<"Business", 'String'>
    readonly vk: FieldRef<"Business", 'String'>
    readonly youtube: FieldRef<"Business", 'String'>
    readonly address: FieldRef<"Business", 'String'>
    readonly latitude: FieldRef<"Business", 'Float'>
    readonly longitude: FieldRef<"Business", 'Float'>
    readonly createdAt: FieldRef<"Business", 'DateTime'>
    readonly updatedAt: FieldRef<"Business", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Business findUnique
   */
  export type BusinessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findUniqueOrThrow
   */
  export type BusinessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findFirst
   */
  export type BusinessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findFirstOrThrow
   */
  export type BusinessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findMany
   */
  export type BusinessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Businesses to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business create
   */
  export type BusinessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The data needed to create a Business.
     */
    data: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
  }

  /**
   * Business createMany
   */
  export type BusinessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business createManyAndReturn
   */
  export type BusinessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business update
   */
  export type BusinessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The data needed to update a Business.
     */
    data: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
    /**
     * Choose, which Business to update.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business updateMany
   */
  export type BusinessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business updateManyAndReturn
   */
  export type BusinessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business upsert
   */
  export type BusinessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The filter to search for the Business to update in case it exists.
     */
    where: BusinessWhereUniqueInput
    /**
     * In case the Business found by the `where` argument doesn't exist, create a new Business with this data.
     */
    create: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
    /**
     * In case the Business was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
  }

  /**
   * Business delete
   */
  export type BusinessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter which Business to delete.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business deleteMany
   */
  export type BusinessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Businesses to delete
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to delete.
     */
    limit?: number
  }

  /**
   * Business.businessMembers
   */
  export type Business$businessMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    where?: BusinessMemberWhereInput
    orderBy?: BusinessMemberOrderByWithRelationInput | BusinessMemberOrderByWithRelationInput[]
    cursor?: BusinessMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessMemberScalarFieldEnum | BusinessMemberScalarFieldEnum[]
  }

  /**
   * Business.serviceCategories
   */
  export type Business$serviceCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    where?: ServiceCategoryWhereInput
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    cursor?: ServiceCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * Business.services
   */
  export type Business$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Business.employees
   */
  export type Business$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Business without action
   */
  export type BusinessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
  }


  /**
   * Model BusinessMember
   */

  export type AggregateBusinessMember = {
    _count: BusinessMemberCountAggregateOutputType | null
    _min: BusinessMemberMinAggregateOutputType | null
    _max: BusinessMemberMaxAggregateOutputType | null
  }

  export type BusinessMemberMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    businessId: string | null
    role: $Enums.BusinessRole | null
    createdAt: Date | null
  }

  export type BusinessMemberMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    businessId: string | null
    role: $Enums.BusinessRole | null
    createdAt: Date | null
  }

  export type BusinessMemberCountAggregateOutputType = {
    id: number
    adminUserId: number
    businessId: number
    role: number
    createdAt: number
    _all: number
  }


  export type BusinessMemberMinAggregateInputType = {
    id?: true
    adminUserId?: true
    businessId?: true
    role?: true
    createdAt?: true
  }

  export type BusinessMemberMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    businessId?: true
    role?: true
    createdAt?: true
  }

  export type BusinessMemberCountAggregateInputType = {
    id?: true
    adminUserId?: true
    businessId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type BusinessMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessMember to aggregate.
     */
    where?: BusinessMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessMembers to fetch.
     */
    orderBy?: BusinessMemberOrderByWithRelationInput | BusinessMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessMembers
    **/
    _count?: true | BusinessMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessMemberMaxAggregateInputType
  }

  export type GetBusinessMemberAggregateType<T extends BusinessMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessMember[P]>
      : GetScalarType<T[P], AggregateBusinessMember[P]>
  }




  export type BusinessMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessMemberWhereInput
    orderBy?: BusinessMemberOrderByWithAggregationInput | BusinessMemberOrderByWithAggregationInput[]
    by: BusinessMemberScalarFieldEnum[] | BusinessMemberScalarFieldEnum
    having?: BusinessMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessMemberCountAggregateInputType | true
    _min?: BusinessMemberMinAggregateInputType
    _max?: BusinessMemberMaxAggregateInputType
  }

  export type BusinessMemberGroupByOutputType = {
    id: string
    adminUserId: string
    businessId: string
    role: $Enums.BusinessRole
    createdAt: Date
    _count: BusinessMemberCountAggregateOutputType | null
    _min: BusinessMemberMinAggregateOutputType | null
    _max: BusinessMemberMaxAggregateOutputType | null
  }

  type GetBusinessMemberGroupByPayload<T extends BusinessMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessMemberGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessMemberGroupByOutputType[P]>
        }
      >
    >


  export type BusinessMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    businessId?: boolean
    role?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessMember"]>

  export type BusinessMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    businessId?: boolean
    role?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessMember"]>

  export type BusinessMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    businessId?: boolean
    role?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessMember"]>

  export type BusinessMemberSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    businessId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type BusinessMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminUserId" | "businessId" | "role" | "createdAt", ExtArgs["result"]["businessMember"]>
  export type BusinessMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type BusinessMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type BusinessMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $BusinessMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessMember"
    objects: {
      adminUser: Prisma.$AdminUserPayload<ExtArgs>
      business: Prisma.$BusinessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string
      businessId: string
      role: $Enums.BusinessRole
      createdAt: Date
    }, ExtArgs["result"]["businessMember"]>
    composites: {}
  }

  type BusinessMemberGetPayload<S extends boolean | null | undefined | BusinessMemberDefaultArgs> = $Result.GetResult<Prisma.$BusinessMemberPayload, S>

  type BusinessMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessMemberCountAggregateInputType | true
    }

  export interface BusinessMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessMember'], meta: { name: 'BusinessMember' } }
    /**
     * Find zero or one BusinessMember that matches the filter.
     * @param {BusinessMemberFindUniqueArgs} args - Arguments to find a BusinessMember
     * @example
     * // Get one BusinessMember
     * const businessMember = await prisma.businessMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessMemberFindUniqueArgs>(args: SelectSubset<T, BusinessMemberFindUniqueArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusinessMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessMemberFindUniqueOrThrowArgs} args - Arguments to find a BusinessMember
     * @example
     * // Get one BusinessMember
     * const businessMember = await prisma.businessMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberFindFirstArgs} args - Arguments to find a BusinessMember
     * @example
     * // Get one BusinessMember
     * const businessMember = await prisma.businessMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessMemberFindFirstArgs>(args?: SelectSubset<T, BusinessMemberFindFirstArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberFindFirstOrThrowArgs} args - Arguments to find a BusinessMember
     * @example
     * // Get one BusinessMember
     * const businessMember = await prisma.businessMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusinessMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessMembers
     * const businessMembers = await prisma.businessMember.findMany()
     * 
     * // Get first 10 BusinessMembers
     * const businessMembers = await prisma.businessMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessMemberWithIdOnly = await prisma.businessMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessMemberFindManyArgs>(args?: SelectSubset<T, BusinessMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusinessMember.
     * @param {BusinessMemberCreateArgs} args - Arguments to create a BusinessMember.
     * @example
     * // Create one BusinessMember
     * const BusinessMember = await prisma.businessMember.create({
     *   data: {
     *     // ... data to create a BusinessMember
     *   }
     * })
     * 
     */
    create<T extends BusinessMemberCreateArgs>(args: SelectSubset<T, BusinessMemberCreateArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusinessMembers.
     * @param {BusinessMemberCreateManyArgs} args - Arguments to create many BusinessMembers.
     * @example
     * // Create many BusinessMembers
     * const businessMember = await prisma.businessMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessMemberCreateManyArgs>(args?: SelectSubset<T, BusinessMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessMembers and returns the data saved in the database.
     * @param {BusinessMemberCreateManyAndReturnArgs} args - Arguments to create many BusinessMembers.
     * @example
     * // Create many BusinessMembers
     * const businessMember = await prisma.businessMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessMembers and only return the `id`
     * const businessMemberWithIdOnly = await prisma.businessMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusinessMember.
     * @param {BusinessMemberDeleteArgs} args - Arguments to delete one BusinessMember.
     * @example
     * // Delete one BusinessMember
     * const BusinessMember = await prisma.businessMember.delete({
     *   where: {
     *     // ... filter to delete one BusinessMember
     *   }
     * })
     * 
     */
    delete<T extends BusinessMemberDeleteArgs>(args: SelectSubset<T, BusinessMemberDeleteArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusinessMember.
     * @param {BusinessMemberUpdateArgs} args - Arguments to update one BusinessMember.
     * @example
     * // Update one BusinessMember
     * const businessMember = await prisma.businessMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessMemberUpdateArgs>(args: SelectSubset<T, BusinessMemberUpdateArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusinessMembers.
     * @param {BusinessMemberDeleteManyArgs} args - Arguments to filter BusinessMembers to delete.
     * @example
     * // Delete a few BusinessMembers
     * const { count } = await prisma.businessMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessMemberDeleteManyArgs>(args?: SelectSubset<T, BusinessMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessMembers
     * const businessMember = await prisma.businessMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessMemberUpdateManyArgs>(args: SelectSubset<T, BusinessMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessMembers and returns the data updated in the database.
     * @param {BusinessMemberUpdateManyAndReturnArgs} args - Arguments to update many BusinessMembers.
     * @example
     * // Update many BusinessMembers
     * const businessMember = await prisma.businessMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusinessMembers and only return the `id`
     * const businessMemberWithIdOnly = await prisma.businessMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusinessMember.
     * @param {BusinessMemberUpsertArgs} args - Arguments to update or create a BusinessMember.
     * @example
     * // Update or create a BusinessMember
     * const businessMember = await prisma.businessMember.upsert({
     *   create: {
     *     // ... data to create a BusinessMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessMember we want to update
     *   }
     * })
     */
    upsert<T extends BusinessMemberUpsertArgs>(args: SelectSubset<T, BusinessMemberUpsertArgs<ExtArgs>>): Prisma__BusinessMemberClient<$Result.GetResult<Prisma.$BusinessMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusinessMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberCountArgs} args - Arguments to filter BusinessMembers to count.
     * @example
     * // Count the number of BusinessMembers
     * const count = await prisma.businessMember.count({
     *   where: {
     *     // ... the filter for the BusinessMembers we want to count
     *   }
     * })
    **/
    count<T extends BusinessMemberCountArgs>(
      args?: Subset<T, BusinessMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessMemberAggregateArgs>(args: Subset<T, BusinessMemberAggregateArgs>): Prisma.PrismaPromise<GetBusinessMemberAggregateType<T>>

    /**
     * Group by BusinessMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessMemberGroupByArgs['orderBy'] }
        : { orderBy?: BusinessMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessMember model
   */
  readonly fields: BusinessMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminUser<T extends AdminUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminUserDefaultArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessMember model
   */
  interface BusinessMemberFieldRefs {
    readonly id: FieldRef<"BusinessMember", 'String'>
    readonly adminUserId: FieldRef<"BusinessMember", 'String'>
    readonly businessId: FieldRef<"BusinessMember", 'String'>
    readonly role: FieldRef<"BusinessMember", 'BusinessRole'>
    readonly createdAt: FieldRef<"BusinessMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BusinessMember findUnique
   */
  export type BusinessMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * Filter, which BusinessMember to fetch.
     */
    where: BusinessMemberWhereUniqueInput
  }

  /**
   * BusinessMember findUniqueOrThrow
   */
  export type BusinessMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * Filter, which BusinessMember to fetch.
     */
    where: BusinessMemberWhereUniqueInput
  }

  /**
   * BusinessMember findFirst
   */
  export type BusinessMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * Filter, which BusinessMember to fetch.
     */
    where?: BusinessMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessMembers to fetch.
     */
    orderBy?: BusinessMemberOrderByWithRelationInput | BusinessMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessMembers.
     */
    cursor?: BusinessMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessMembers.
     */
    distinct?: BusinessMemberScalarFieldEnum | BusinessMemberScalarFieldEnum[]
  }

  /**
   * BusinessMember findFirstOrThrow
   */
  export type BusinessMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * Filter, which BusinessMember to fetch.
     */
    where?: BusinessMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessMembers to fetch.
     */
    orderBy?: BusinessMemberOrderByWithRelationInput | BusinessMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessMembers.
     */
    cursor?: BusinessMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessMembers.
     */
    distinct?: BusinessMemberScalarFieldEnum | BusinessMemberScalarFieldEnum[]
  }

  /**
   * BusinessMember findMany
   */
  export type BusinessMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * Filter, which BusinessMembers to fetch.
     */
    where?: BusinessMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessMembers to fetch.
     */
    orderBy?: BusinessMemberOrderByWithRelationInput | BusinessMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessMembers.
     */
    cursor?: BusinessMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessMembers.
     */
    skip?: number
    distinct?: BusinessMemberScalarFieldEnum | BusinessMemberScalarFieldEnum[]
  }

  /**
   * BusinessMember create
   */
  export type BusinessMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessMember.
     */
    data: XOR<BusinessMemberCreateInput, BusinessMemberUncheckedCreateInput>
  }

  /**
   * BusinessMember createMany
   */
  export type BusinessMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessMembers.
     */
    data: BusinessMemberCreateManyInput | BusinessMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessMember createManyAndReturn
   */
  export type BusinessMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * The data used to create many BusinessMembers.
     */
    data: BusinessMemberCreateManyInput | BusinessMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessMember update
   */
  export type BusinessMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessMember.
     */
    data: XOR<BusinessMemberUpdateInput, BusinessMemberUncheckedUpdateInput>
    /**
     * Choose, which BusinessMember to update.
     */
    where: BusinessMemberWhereUniqueInput
  }

  /**
   * BusinessMember updateMany
   */
  export type BusinessMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessMembers.
     */
    data: XOR<BusinessMemberUpdateManyMutationInput, BusinessMemberUncheckedUpdateManyInput>
    /**
     * Filter which BusinessMembers to update
     */
    where?: BusinessMemberWhereInput
    /**
     * Limit how many BusinessMembers to update.
     */
    limit?: number
  }

  /**
   * BusinessMember updateManyAndReturn
   */
  export type BusinessMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * The data used to update BusinessMembers.
     */
    data: XOR<BusinessMemberUpdateManyMutationInput, BusinessMemberUncheckedUpdateManyInput>
    /**
     * Filter which BusinessMembers to update
     */
    where?: BusinessMemberWhereInput
    /**
     * Limit how many BusinessMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessMember upsert
   */
  export type BusinessMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessMember to update in case it exists.
     */
    where: BusinessMemberWhereUniqueInput
    /**
     * In case the BusinessMember found by the `where` argument doesn't exist, create a new BusinessMember with this data.
     */
    create: XOR<BusinessMemberCreateInput, BusinessMemberUncheckedCreateInput>
    /**
     * In case the BusinessMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessMemberUpdateInput, BusinessMemberUncheckedUpdateInput>
  }

  /**
   * BusinessMember delete
   */
  export type BusinessMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
    /**
     * Filter which BusinessMember to delete.
     */
    where: BusinessMemberWhereUniqueInput
  }

  /**
   * BusinessMember deleteMany
   */
  export type BusinessMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessMembers to delete
     */
    where?: BusinessMemberWhereInput
    /**
     * Limit how many BusinessMembers to delete.
     */
    limit?: number
  }

  /**
   * BusinessMember without action
   */
  export type BusinessMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessMember
     */
    select?: BusinessMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessMember
     */
    omit?: BusinessMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessMemberInclude<ExtArgs> | null
  }


  /**
   * Model ServiceCategory
   */

  export type AggregateServiceCategory = {
    _count: ServiceCategoryCountAggregateOutputType | null
    _min: ServiceCategoryMinAggregateOutputType | null
    _max: ServiceCategoryMaxAggregateOutputType | null
  }

  export type ServiceCategoryMinAggregateOutputType = {
    id: string | null
    businessId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCategoryMaxAggregateOutputType = {
    id: string | null
    businessId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCategoryCountAggregateOutputType = {
    id: number
    businessId: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceCategoryMinAggregateInputType = {
    id?: true
    businessId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCategoryMaxAggregateInputType = {
    id?: true
    businessId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCategoryCountAggregateInputType = {
    id?: true
    businessId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceCategory to aggregate.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceCategories
    **/
    _count?: true | ServiceCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceCategoryMaxAggregateInputType
  }

  export type GetServiceCategoryAggregateType<T extends ServiceCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceCategory[P]>
      : GetScalarType<T[P], AggregateServiceCategory[P]>
  }




  export type ServiceCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceCategoryWhereInput
    orderBy?: ServiceCategoryOrderByWithAggregationInput | ServiceCategoryOrderByWithAggregationInput[]
    by: ServiceCategoryScalarFieldEnum[] | ServiceCategoryScalarFieldEnum
    having?: ServiceCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCategoryCountAggregateInputType | true
    _min?: ServiceCategoryMinAggregateInputType
    _max?: ServiceCategoryMaxAggregateInputType
  }

  export type ServiceCategoryGroupByOutputType = {
    id: string
    businessId: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: ServiceCategoryCountAggregateOutputType | null
    _min: ServiceCategoryMinAggregateOutputType | null
    _max: ServiceCategoryMaxAggregateOutputType | null
  }

  type GetServiceCategoryGroupByPayload<T extends ServiceCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ServiceCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    services?: boolean | ServiceCategory$servicesArgs<ExtArgs>
    _count?: boolean | ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceCategory"]>

  export type ServiceCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceCategory"]>

  export type ServiceCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceCategory"]>

  export type ServiceCategorySelectScalar = {
    id?: boolean
    businessId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "businessId" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceCategory"]>
  export type ServiceCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    services?: boolean | ServiceCategory$servicesArgs<ExtArgs>
    _count?: boolean | ServiceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type ServiceCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $ServiceCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceCategory"
    objects: {
      business: Prisma.$BusinessPayload<ExtArgs>
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessId: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceCategory"]>
    composites: {}
  }

  type ServiceCategoryGetPayload<S extends boolean | null | undefined | ServiceCategoryDefaultArgs> = $Result.GetResult<Prisma.$ServiceCategoryPayload, S>

  type ServiceCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCategoryCountAggregateInputType | true
    }

  export interface ServiceCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceCategory'], meta: { name: 'ServiceCategory' } }
    /**
     * Find zero or one ServiceCategory that matches the filter.
     * @param {ServiceCategoryFindUniqueArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceCategoryFindUniqueArgs>(args: SelectSubset<T, ServiceCategoryFindUniqueArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceCategoryFindUniqueOrThrowArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindFirstArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceCategoryFindFirstArgs>(args?: SelectSubset<T, ServiceCategoryFindFirstArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindFirstOrThrowArgs} args - Arguments to find a ServiceCategory
     * @example
     * // Get one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceCategories
     * const serviceCategories = await prisma.serviceCategory.findMany()
     * 
     * // Get first 10 ServiceCategories
     * const serviceCategories = await prisma.serviceCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceCategoryFindManyArgs>(args?: SelectSubset<T, ServiceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceCategory.
     * @param {ServiceCategoryCreateArgs} args - Arguments to create a ServiceCategory.
     * @example
     * // Create one ServiceCategory
     * const ServiceCategory = await prisma.serviceCategory.create({
     *   data: {
     *     // ... data to create a ServiceCategory
     *   }
     * })
     * 
     */
    create<T extends ServiceCategoryCreateArgs>(args: SelectSubset<T, ServiceCategoryCreateArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceCategories.
     * @param {ServiceCategoryCreateManyArgs} args - Arguments to create many ServiceCategories.
     * @example
     * // Create many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCategoryCreateManyArgs>(args?: SelectSubset<T, ServiceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceCategories and returns the data saved in the database.
     * @param {ServiceCategoryCreateManyAndReturnArgs} args - Arguments to create many ServiceCategories.
     * @example
     * // Create many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceCategories and only return the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceCategory.
     * @param {ServiceCategoryDeleteArgs} args - Arguments to delete one ServiceCategory.
     * @example
     * // Delete one ServiceCategory
     * const ServiceCategory = await prisma.serviceCategory.delete({
     *   where: {
     *     // ... filter to delete one ServiceCategory
     *   }
     * })
     * 
     */
    delete<T extends ServiceCategoryDeleteArgs>(args: SelectSubset<T, ServiceCategoryDeleteArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceCategory.
     * @param {ServiceCategoryUpdateArgs} args - Arguments to update one ServiceCategory.
     * @example
     * // Update one ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceCategoryUpdateArgs>(args: SelectSubset<T, ServiceCategoryUpdateArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceCategories.
     * @param {ServiceCategoryDeleteManyArgs} args - Arguments to filter ServiceCategories to delete.
     * @example
     * // Delete a few ServiceCategories
     * const { count } = await prisma.serviceCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceCategoryDeleteManyArgs>(args?: SelectSubset<T, ServiceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceCategoryUpdateManyArgs>(args: SelectSubset<T, ServiceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceCategories and returns the data updated in the database.
     * @param {ServiceCategoryUpdateManyAndReturnArgs} args - Arguments to update many ServiceCategories.
     * @example
     * // Update many ServiceCategories
     * const serviceCategory = await prisma.serviceCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceCategories and only return the `id`
     * const serviceCategoryWithIdOnly = await prisma.serviceCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceCategory.
     * @param {ServiceCategoryUpsertArgs} args - Arguments to update or create a ServiceCategory.
     * @example
     * // Update or create a ServiceCategory
     * const serviceCategory = await prisma.serviceCategory.upsert({
     *   create: {
     *     // ... data to create a ServiceCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceCategory we want to update
     *   }
     * })
     */
    upsert<T extends ServiceCategoryUpsertArgs>(args: SelectSubset<T, ServiceCategoryUpsertArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryCountArgs} args - Arguments to filter ServiceCategories to count.
     * @example
     * // Count the number of ServiceCategories
     * const count = await prisma.serviceCategory.count({
     *   where: {
     *     // ... the filter for the ServiceCategories we want to count
     *   }
     * })
    **/
    count<T extends ServiceCategoryCountArgs>(
      args?: Subset<T, ServiceCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceCategoryAggregateArgs>(args: Subset<T, ServiceCategoryAggregateArgs>): Prisma.PrismaPromise<GetServiceCategoryAggregateType<T>>

    /**
     * Group by ServiceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ServiceCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceCategory model
   */
  readonly fields: ServiceCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    services<T extends ServiceCategory$servicesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceCategory$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceCategory model
   */
  interface ServiceCategoryFieldRefs {
    readonly id: FieldRef<"ServiceCategory", 'String'>
    readonly businessId: FieldRef<"ServiceCategory", 'String'>
    readonly name: FieldRef<"ServiceCategory", 'String'>
    readonly createdAt: FieldRef<"ServiceCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceCategory findUnique
   */
  export type ServiceCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory findUniqueOrThrow
   */
  export type ServiceCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory findFirst
   */
  export type ServiceCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceCategories.
     */
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory findFirstOrThrow
   */
  export type ServiceCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategory to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceCategories.
     */
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory findMany
   */
  export type ServiceCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ServiceCategories to fetch.
     */
    where?: ServiceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceCategories to fetch.
     */
    orderBy?: ServiceCategoryOrderByWithRelationInput | ServiceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceCategories.
     */
    cursor?: ServiceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceCategories.
     */
    skip?: number
    distinct?: ServiceCategoryScalarFieldEnum | ServiceCategoryScalarFieldEnum[]
  }

  /**
   * ServiceCategory create
   */
  export type ServiceCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceCategory.
     */
    data: XOR<ServiceCategoryCreateInput, ServiceCategoryUncheckedCreateInput>
  }

  /**
   * ServiceCategory createMany
   */
  export type ServiceCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceCategories.
     */
    data: ServiceCategoryCreateManyInput | ServiceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceCategory createManyAndReturn
   */
  export type ServiceCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceCategories.
     */
    data: ServiceCategoryCreateManyInput | ServiceCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceCategory update
   */
  export type ServiceCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceCategory.
     */
    data: XOR<ServiceCategoryUpdateInput, ServiceCategoryUncheckedUpdateInput>
    /**
     * Choose, which ServiceCategory to update.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory updateMany
   */
  export type ServiceCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceCategories.
     */
    data: XOR<ServiceCategoryUpdateManyMutationInput, ServiceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ServiceCategories to update
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to update.
     */
    limit?: number
  }

  /**
   * ServiceCategory updateManyAndReturn
   */
  export type ServiceCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ServiceCategories.
     */
    data: XOR<ServiceCategoryUpdateManyMutationInput, ServiceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ServiceCategories to update
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceCategory upsert
   */
  export type ServiceCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceCategory to update in case it exists.
     */
    where: ServiceCategoryWhereUniqueInput
    /**
     * In case the ServiceCategory found by the `where` argument doesn't exist, create a new ServiceCategory with this data.
     */
    create: XOR<ServiceCategoryCreateInput, ServiceCategoryUncheckedCreateInput>
    /**
     * In case the ServiceCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceCategoryUpdateInput, ServiceCategoryUncheckedUpdateInput>
  }

  /**
   * ServiceCategory delete
   */
  export type ServiceCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    /**
     * Filter which ServiceCategory to delete.
     */
    where: ServiceCategoryWhereUniqueInput
  }

  /**
   * ServiceCategory deleteMany
   */
  export type ServiceCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceCategories to delete
     */
    where?: ServiceCategoryWhereInput
    /**
     * Limit how many ServiceCategories to delete.
     */
    limit?: number
  }

  /**
   * ServiceCategory.services
   */
  export type ServiceCategory$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * ServiceCategory without action
   */
  export type ServiceCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: Decimal | null
    durationMinutes: number | null
    breakAfterMinutes: number | null
    position: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: Decimal | null
    durationMinutes: number | null
    breakAfterMinutes: number | null
    position: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    businessId: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    durationMinutes: number | null
    breakAfterMinutes: number | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    businessId: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    durationMinutes: number | null
    breakAfterMinutes: number | null
    position: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    businessId: number
    categoryId: number
    name: number
    description: number
    price: number
    durationMinutes: number
    breakAfterMinutes: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    durationMinutes?: true
    breakAfterMinutes?: true
    position?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    durationMinutes?: true
    breakAfterMinutes?: true
    position?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    businessId?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    durationMinutes?: true
    breakAfterMinutes?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    businessId?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    durationMinutes?: true
    breakAfterMinutes?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    businessId?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    durationMinutes?: true
    breakAfterMinutes?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    businessId: string
    categoryId: string | null
    name: string
    description: string | null
    price: Decimal
    durationMinutes: number
    breakAfterMinutes: number | null
    position: number
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    durationMinutes?: boolean
    breakAfterMinutes?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
    employeeServices?: boolean | Service$employeeServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    durationMinutes?: boolean
    breakAfterMinutes?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    durationMinutes?: boolean
    breakAfterMinutes?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    businessId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    durationMinutes?: boolean
    breakAfterMinutes?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "businessId" | "categoryId" | "name" | "description" | "price" | "durationMinutes" | "breakAfterMinutes" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
    employeeServices?: boolean | Service$employeeServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      business: Prisma.$BusinessPayload<ExtArgs>
      category: Prisma.$ServiceCategoryPayload<ExtArgs> | null
      employeeServices: Prisma.$EmployeeServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessId: string
      categoryId: string | null
      name: string
      description: string | null
      price: Prisma.Decimal
      durationMinutes: number
      breakAfterMinutes: number | null
      position: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends Service$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Service$categoryArgs<ExtArgs>>): Prisma__ServiceCategoryClient<$Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employeeServices<T extends Service$employeeServicesArgs<ExtArgs> = {}>(args?: Subset<T, Service$employeeServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly businessId: FieldRef<"Service", 'String'>
    readonly categoryId: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Decimal'>
    readonly durationMinutes: FieldRef<"Service", 'Int'>
    readonly breakAfterMinutes: FieldRef<"Service", 'Int'>
    readonly position: FieldRef<"Service", 'Int'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.category
   */
  export type Service$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCategory
     */
    select?: ServiceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceCategory
     */
    omit?: ServiceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceCategoryInclude<ExtArgs> | null
    where?: ServiceCategoryWhereInput
  }

  /**
   * Service.employeeServices
   */
  export type Service$employeeServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    where?: EmployeeServiceWhereInput
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    cursor?: EmployeeServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    businessId: string | null
    name: string | null
    specialization: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    businessId: string | null
    name: string | null
    specialization: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    businessId: number
    name: number
    specialization: number
    imagePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    businessId?: true
    name?: true
    specialization?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    businessId?: true
    name?: true
    specialization?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    businessId?: true
    name?: true
    specialization?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    businessId: string
    name: string
    specialization: string | null
    imagePath: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    name?: boolean
    specialization?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    employeeServices?: boolean | Employee$employeeServicesArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    name?: boolean
    specialization?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessId?: boolean
    name?: boolean
    specialization?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    businessId?: boolean
    name?: boolean
    specialization?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "businessId" | "name" | "specialization" | "imagePath" | "createdAt" | "updatedAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
    employeeServices?: boolean | Employee$employeeServicesArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      business: Prisma.$BusinessPayload<ExtArgs>
      employeeServices: Prisma.$EmployeeServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessId: string
      name: string
      specialization: string | null
      imagePath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employeeServices<T extends Employee$employeeServicesArgs<ExtArgs> = {}>(args?: Subset<T, Employee$employeeServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly businessId: FieldRef<"Employee", 'String'>
    readonly name: FieldRef<"Employee", 'String'>
    readonly specialization: FieldRef<"Employee", 'String'>
    readonly imagePath: FieldRef<"Employee", 'String'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.employeeServices
   */
  export type Employee$employeeServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    where?: EmployeeServiceWhereInput
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    cursor?: EmployeeServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeService
   */

  export type AggregateEmployeeService = {
    _count: EmployeeServiceCountAggregateOutputType | null
    _min: EmployeeServiceMinAggregateOutputType | null
    _max: EmployeeServiceMaxAggregateOutputType | null
  }

  export type EmployeeServiceMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    serviceId: string | null
    createdAt: Date | null
  }

  export type EmployeeServiceMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    serviceId: string | null
    createdAt: Date | null
  }

  export type EmployeeServiceCountAggregateOutputType = {
    id: number
    employeeId: number
    serviceId: number
    createdAt: number
    _all: number
  }


  export type EmployeeServiceMinAggregateInputType = {
    id?: true
    employeeId?: true
    serviceId?: true
    createdAt?: true
  }

  export type EmployeeServiceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    serviceId?: true
    createdAt?: true
  }

  export type EmployeeServiceCountAggregateInputType = {
    id?: true
    employeeId?: true
    serviceId?: true
    createdAt?: true
    _all?: true
  }

  export type EmployeeServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeService to aggregate.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeServices
    **/
    _count?: true | EmployeeServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeServiceMaxAggregateInputType
  }

  export type GetEmployeeServiceAggregateType<T extends EmployeeServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeService[P]>
      : GetScalarType<T[P], AggregateEmployeeService[P]>
  }




  export type EmployeeServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeServiceWhereInput
    orderBy?: EmployeeServiceOrderByWithAggregationInput | EmployeeServiceOrderByWithAggregationInput[]
    by: EmployeeServiceScalarFieldEnum[] | EmployeeServiceScalarFieldEnum
    having?: EmployeeServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeServiceCountAggregateInputType | true
    _min?: EmployeeServiceMinAggregateInputType
    _max?: EmployeeServiceMaxAggregateInputType
  }

  export type EmployeeServiceGroupByOutputType = {
    id: string
    employeeId: string
    serviceId: string
    createdAt: Date
    _count: EmployeeServiceCountAggregateOutputType | null
    _min: EmployeeServiceMinAggregateOutputType | null
    _max: EmployeeServiceMaxAggregateOutputType | null
  }

  type GetEmployeeServiceGroupByPayload<T extends EmployeeServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeServiceGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeServiceGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeService"]>

  export type EmployeeServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeService"]>

  export type EmployeeServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    serviceId?: boolean
    createdAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeService"]>

  export type EmployeeServiceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    serviceId?: boolean
    createdAt?: boolean
  }

  export type EmployeeServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "serviceId" | "createdAt", ExtArgs["result"]["employeeService"]>
  export type EmployeeServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type EmployeeServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type EmployeeServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $EmployeeServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeService"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      serviceId: string
      createdAt: Date
    }, ExtArgs["result"]["employeeService"]>
    composites: {}
  }

  type EmployeeServiceGetPayload<S extends boolean | null | undefined | EmployeeServiceDefaultArgs> = $Result.GetResult<Prisma.$EmployeeServicePayload, S>

  type EmployeeServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeServiceCountAggregateInputType | true
    }

  export interface EmployeeServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeService'], meta: { name: 'EmployeeService' } }
    /**
     * Find zero or one EmployeeService that matches the filter.
     * @param {EmployeeServiceFindUniqueArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeServiceFindUniqueArgs>(args: SelectSubset<T, EmployeeServiceFindUniqueArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeService that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeServiceFindUniqueOrThrowArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceFindFirstArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeServiceFindFirstArgs>(args?: SelectSubset<T, EmployeeServiceFindFirstArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceFindFirstOrThrowArgs} args - Arguments to find a EmployeeService
     * @example
     * // Get one EmployeeService
     * const employeeService = await prisma.employeeService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeServices
     * const employeeServices = await prisma.employeeService.findMany()
     * 
     * // Get first 10 EmployeeServices
     * const employeeServices = await prisma.employeeService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeServiceWithIdOnly = await prisma.employeeService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeServiceFindManyArgs>(args?: SelectSubset<T, EmployeeServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeService.
     * @param {EmployeeServiceCreateArgs} args - Arguments to create a EmployeeService.
     * @example
     * // Create one EmployeeService
     * const EmployeeService = await prisma.employeeService.create({
     *   data: {
     *     // ... data to create a EmployeeService
     *   }
     * })
     * 
     */
    create<T extends EmployeeServiceCreateArgs>(args: SelectSubset<T, EmployeeServiceCreateArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeServices.
     * @param {EmployeeServiceCreateManyArgs} args - Arguments to create many EmployeeServices.
     * @example
     * // Create many EmployeeServices
     * const employeeService = await prisma.employeeService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeServiceCreateManyArgs>(args?: SelectSubset<T, EmployeeServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeServices and returns the data saved in the database.
     * @param {EmployeeServiceCreateManyAndReturnArgs} args - Arguments to create many EmployeeServices.
     * @example
     * // Create many EmployeeServices
     * const employeeService = await prisma.employeeService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeServices and only return the `id`
     * const employeeServiceWithIdOnly = await prisma.employeeService.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeService.
     * @param {EmployeeServiceDeleteArgs} args - Arguments to delete one EmployeeService.
     * @example
     * // Delete one EmployeeService
     * const EmployeeService = await prisma.employeeService.delete({
     *   where: {
     *     // ... filter to delete one EmployeeService
     *   }
     * })
     * 
     */
    delete<T extends EmployeeServiceDeleteArgs>(args: SelectSubset<T, EmployeeServiceDeleteArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeService.
     * @param {EmployeeServiceUpdateArgs} args - Arguments to update one EmployeeService.
     * @example
     * // Update one EmployeeService
     * const employeeService = await prisma.employeeService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeServiceUpdateArgs>(args: SelectSubset<T, EmployeeServiceUpdateArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeServices.
     * @param {EmployeeServiceDeleteManyArgs} args - Arguments to filter EmployeeServices to delete.
     * @example
     * // Delete a few EmployeeServices
     * const { count } = await prisma.employeeService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeServiceDeleteManyArgs>(args?: SelectSubset<T, EmployeeServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeServices
     * const employeeService = await prisma.employeeService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeServiceUpdateManyArgs>(args: SelectSubset<T, EmployeeServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeServices and returns the data updated in the database.
     * @param {EmployeeServiceUpdateManyAndReturnArgs} args - Arguments to update many EmployeeServices.
     * @example
     * // Update many EmployeeServices
     * const employeeService = await prisma.employeeService.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeServices and only return the `id`
     * const employeeServiceWithIdOnly = await prisma.employeeService.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeService.
     * @param {EmployeeServiceUpsertArgs} args - Arguments to update or create a EmployeeService.
     * @example
     * // Update or create a EmployeeService
     * const employeeService = await prisma.employeeService.upsert({
     *   create: {
     *     // ... data to create a EmployeeService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeService we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeServiceUpsertArgs>(args: SelectSubset<T, EmployeeServiceUpsertArgs<ExtArgs>>): Prisma__EmployeeServiceClient<$Result.GetResult<Prisma.$EmployeeServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceCountArgs} args - Arguments to filter EmployeeServices to count.
     * @example
     * // Count the number of EmployeeServices
     * const count = await prisma.employeeService.count({
     *   where: {
     *     // ... the filter for the EmployeeServices we want to count
     *   }
     * })
    **/
    count<T extends EmployeeServiceCountArgs>(
      args?: Subset<T, EmployeeServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeServiceAggregateArgs>(args: Subset<T, EmployeeServiceAggregateArgs>): Prisma.PrismaPromise<GetEmployeeServiceAggregateType<T>>

    /**
     * Group by EmployeeService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeServiceGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeService model
   */
  readonly fields: EmployeeServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeService model
   */
  interface EmployeeServiceFieldRefs {
    readonly id: FieldRef<"EmployeeService", 'String'>
    readonly employeeId: FieldRef<"EmployeeService", 'String'>
    readonly serviceId: FieldRef<"EmployeeService", 'String'>
    readonly createdAt: FieldRef<"EmployeeService", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeService findUnique
   */
  export type EmployeeServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService findUniqueOrThrow
   */
  export type EmployeeServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService findFirst
   */
  export type EmployeeServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeServices.
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeServices.
     */
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * EmployeeService findFirstOrThrow
   */
  export type EmployeeServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeService to fetch.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeServices.
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeServices.
     */
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * EmployeeService findMany
   */
  export type EmployeeServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeServices to fetch.
     */
    where?: EmployeeServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeServices to fetch.
     */
    orderBy?: EmployeeServiceOrderByWithRelationInput | EmployeeServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeServices.
     */
    cursor?: EmployeeServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeServices.
     */
    skip?: number
    distinct?: EmployeeServiceScalarFieldEnum | EmployeeServiceScalarFieldEnum[]
  }

  /**
   * EmployeeService create
   */
  export type EmployeeServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeService.
     */
    data: XOR<EmployeeServiceCreateInput, EmployeeServiceUncheckedCreateInput>
  }

  /**
   * EmployeeService createMany
   */
  export type EmployeeServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeServices.
     */
    data: EmployeeServiceCreateManyInput | EmployeeServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeService createManyAndReturn
   */
  export type EmployeeServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeServices.
     */
    data: EmployeeServiceCreateManyInput | EmployeeServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeService update
   */
  export type EmployeeServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeService.
     */
    data: XOR<EmployeeServiceUpdateInput, EmployeeServiceUncheckedUpdateInput>
    /**
     * Choose, which EmployeeService to update.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService updateMany
   */
  export type EmployeeServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeServices.
     */
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeServices to update
     */
    where?: EmployeeServiceWhereInput
    /**
     * Limit how many EmployeeServices to update.
     */
    limit?: number
  }

  /**
   * EmployeeService updateManyAndReturn
   */
  export type EmployeeServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeServices.
     */
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeServices to update
     */
    where?: EmployeeServiceWhereInput
    /**
     * Limit how many EmployeeServices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeService upsert
   */
  export type EmployeeServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeService to update in case it exists.
     */
    where: EmployeeServiceWhereUniqueInput
    /**
     * In case the EmployeeService found by the `where` argument doesn't exist, create a new EmployeeService with this data.
     */
    create: XOR<EmployeeServiceCreateInput, EmployeeServiceUncheckedCreateInput>
    /**
     * In case the EmployeeService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeServiceUpdateInput, EmployeeServiceUncheckedUpdateInput>
  }

  /**
   * EmployeeService delete
   */
  export type EmployeeServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
    /**
     * Filter which EmployeeService to delete.
     */
    where: EmployeeServiceWhereUniqueInput
  }

  /**
   * EmployeeService deleteMany
   */
  export type EmployeeServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeServices to delete
     */
    where?: EmployeeServiceWhereInput
    /**
     * Limit how many EmployeeServices to delete.
     */
    limit?: number
  }

  /**
   * EmployeeService without action
   */
  export type EmployeeServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeService
     */
    select?: EmployeeServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeService
     */
    omit?: EmployeeServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeServiceInclude<ExtArgs> | null
  }


  /**
   * Model AuthProvider
   */

  export type AggregateAuthProvider = {
    _count: AuthProviderCountAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  export type AuthProviderMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    type: $Enums.AuthProviderType | null
    providerId: string | null
    createdAt: Date | null
  }

  export type AuthProviderMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    type: $Enums.AuthProviderType | null
    providerId: string | null
    createdAt: Date | null
  }

  export type AuthProviderCountAggregateOutputType = {
    id: number
    adminUserId: number
    type: number
    providerId: number
    createdAt: number
    _all: number
  }


  export type AuthProviderMinAggregateInputType = {
    id?: true
    adminUserId?: true
    type?: true
    providerId?: true
    createdAt?: true
  }

  export type AuthProviderMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    type?: true
    providerId?: true
    createdAt?: true
  }

  export type AuthProviderCountAggregateInputType = {
    id?: true
    adminUserId?: true
    type?: true
    providerId?: true
    createdAt?: true
    _all?: true
  }

  export type AuthProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProvider to aggregate.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthProviders
    **/
    _count?: true | AuthProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthProviderMaxAggregateInputType
  }

  export type GetAuthProviderAggregateType<T extends AuthProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthProvider[P]>
      : GetScalarType<T[P], AggregateAuthProvider[P]>
  }




  export type AuthProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthProviderWhereInput
    orderBy?: AuthProviderOrderByWithAggregationInput | AuthProviderOrderByWithAggregationInput[]
    by: AuthProviderScalarFieldEnum[] | AuthProviderScalarFieldEnum
    having?: AuthProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthProviderCountAggregateInputType | true
    _min?: AuthProviderMinAggregateInputType
    _max?: AuthProviderMaxAggregateInputType
  }

  export type AuthProviderGroupByOutputType = {
    id: string
    adminUserId: string
    type: $Enums.AuthProviderType
    providerId: string | null
    createdAt: Date
    _count: AuthProviderCountAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  type GetAuthProviderGroupByPayload<T extends AuthProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
            : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
        }
      >
    >


  export type AuthProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    type?: boolean
    providerId?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    credential?: boolean | AuthProvider$credentialArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    type?: boolean
    providerId?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    type?: boolean
    providerId?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    type?: boolean
    providerId?: boolean
    createdAt?: boolean
  }

  export type AuthProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminUserId" | "type" | "providerId" | "createdAt", ExtArgs["result"]["authProvider"]>
  export type AuthProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
    credential?: boolean | AuthProvider$credentialArgs<ExtArgs>
  }
  export type AuthProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }
  export type AuthProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }

  export type $AuthProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthProvider"
    objects: {
      adminUser: Prisma.$AdminUserPayload<ExtArgs>
      credential: Prisma.$UserCredentialPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string
      type: $Enums.AuthProviderType
      providerId: string | null
      createdAt: Date
    }, ExtArgs["result"]["authProvider"]>
    composites: {}
  }

  type AuthProviderGetPayload<S extends boolean | null | undefined | AuthProviderDefaultArgs> = $Result.GetResult<Prisma.$AuthProviderPayload, S>

  type AuthProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthProviderCountAggregateInputType | true
    }

  export interface AuthProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthProvider'], meta: { name: 'AuthProvider' } }
    /**
     * Find zero or one AuthProvider that matches the filter.
     * @param {AuthProviderFindUniqueArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthProviderFindUniqueArgs>(args: SelectSubset<T, AuthProviderFindUniqueArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthProviderFindUniqueOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthProviderFindFirstArgs>(args?: SelectSubset<T, AuthProviderFindFirstArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthProviders
     * const authProviders = await prisma.authProvider.findMany()
     * 
     * // Get first 10 AuthProviders
     * const authProviders = await prisma.authProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthProviderFindManyArgs>(args?: SelectSubset<T, AuthProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthProvider.
     * @param {AuthProviderCreateArgs} args - Arguments to create a AuthProvider.
     * @example
     * // Create one AuthProvider
     * const AuthProvider = await prisma.authProvider.create({
     *   data: {
     *     // ... data to create a AuthProvider
     *   }
     * })
     * 
     */
    create<T extends AuthProviderCreateArgs>(args: SelectSubset<T, AuthProviderCreateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthProviders.
     * @param {AuthProviderCreateManyArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthProviderCreateManyArgs>(args?: SelectSubset<T, AuthProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthProviders and returns the data saved in the database.
     * @param {AuthProviderCreateManyAndReturnArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthProvider.
     * @param {AuthProviderDeleteArgs} args - Arguments to delete one AuthProvider.
     * @example
     * // Delete one AuthProvider
     * const AuthProvider = await prisma.authProvider.delete({
     *   where: {
     *     // ... filter to delete one AuthProvider
     *   }
     * })
     * 
     */
    delete<T extends AuthProviderDeleteArgs>(args: SelectSubset<T, AuthProviderDeleteArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthProvider.
     * @param {AuthProviderUpdateArgs} args - Arguments to update one AuthProvider.
     * @example
     * // Update one AuthProvider
     * const authProvider = await prisma.authProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthProviderUpdateArgs>(args: SelectSubset<T, AuthProviderUpdateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthProviders.
     * @param {AuthProviderDeleteManyArgs} args - Arguments to filter AuthProviders to delete.
     * @example
     * // Delete a few AuthProviders
     * const { count } = await prisma.authProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthProviderDeleteManyArgs>(args?: SelectSubset<T, AuthProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthProviderUpdateManyArgs>(args: SelectSubset<T, AuthProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders and returns the data updated in the database.
     * @param {AuthProviderUpdateManyAndReturnArgs} args - Arguments to update many AuthProviders.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthProvider.
     * @param {AuthProviderUpsertArgs} args - Arguments to update or create a AuthProvider.
     * @example
     * // Update or create a AuthProvider
     * const authProvider = await prisma.authProvider.upsert({
     *   create: {
     *     // ... data to create a AuthProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthProvider we want to update
     *   }
     * })
     */
    upsert<T extends AuthProviderUpsertArgs>(args: SelectSubset<T, AuthProviderUpsertArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderCountArgs} args - Arguments to filter AuthProviders to count.
     * @example
     * // Count the number of AuthProviders
     * const count = await prisma.authProvider.count({
     *   where: {
     *     // ... the filter for the AuthProviders we want to count
     *   }
     * })
    **/
    count<T extends AuthProviderCountArgs>(
      args?: Subset<T, AuthProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthProviderAggregateArgs>(args: Subset<T, AuthProviderAggregateArgs>): Prisma.PrismaPromise<GetAuthProviderAggregateType<T>>

    /**
     * Group by AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthProviderGroupByArgs['orderBy'] }
        : { orderBy?: AuthProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthProvider model
   */
  readonly fields: AuthProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminUser<T extends AdminUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminUserDefaultArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    credential<T extends AuthProvider$credentialArgs<ExtArgs> = {}>(args?: Subset<T, AuthProvider$credentialArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthProvider model
   */
  interface AuthProviderFieldRefs {
    readonly id: FieldRef<"AuthProvider", 'String'>
    readonly adminUserId: FieldRef<"AuthProvider", 'String'>
    readonly type: FieldRef<"AuthProvider", 'AuthProviderType'>
    readonly providerId: FieldRef<"AuthProvider", 'String'>
    readonly createdAt: FieldRef<"AuthProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthProvider findUnique
   */
  export type AuthProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findUniqueOrThrow
   */
  export type AuthProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findFirst
   */
  export type AuthProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findFirstOrThrow
   */
  export type AuthProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findMany
   */
  export type AuthProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProviders to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider create
   */
  export type AuthProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthProvider.
     */
    data: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
  }

  /**
   * AuthProvider createMany
   */
  export type AuthProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthProvider createManyAndReturn
   */
  export type AuthProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthProvider update
   */
  export type AuthProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthProvider.
     */
    data: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
    /**
     * Choose, which AuthProvider to update.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider updateMany
   */
  export type AuthProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
  }

  /**
   * AuthProvider updateManyAndReturn
   */
  export type AuthProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthProvider upsert
   */
  export type AuthProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthProvider to update in case it exists.
     */
    where: AuthProviderWhereUniqueInput
    /**
     * In case the AuthProvider found by the `where` argument doesn't exist, create a new AuthProvider with this data.
     */
    create: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
    /**
     * In case the AuthProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
  }

  /**
   * AuthProvider delete
   */
  export type AuthProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter which AuthProvider to delete.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider deleteMany
   */
  export type AuthProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProviders to delete
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to delete.
     */
    limit?: number
  }

  /**
   * AuthProvider.credential
   */
  export type AuthProvider$credentialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    where?: UserCredentialWhereInput
  }

  /**
   * AuthProvider without action
   */
  export type AuthProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
  }


  /**
   * Model UserCredential
   */

  export type AggregateUserCredential = {
    _count: UserCredentialCountAggregateOutputType | null
    _min: UserCredentialMinAggregateOutputType | null
    _max: UserCredentialMaxAggregateOutputType | null
  }

  export type UserCredentialMinAggregateOutputType = {
    id: string | null
    authProviderId: string | null
    passwordHash: string | null
    updatedAt: Date | null
  }

  export type UserCredentialMaxAggregateOutputType = {
    id: string | null
    authProviderId: string | null
    passwordHash: string | null
    updatedAt: Date | null
  }

  export type UserCredentialCountAggregateOutputType = {
    id: number
    authProviderId: number
    passwordHash: number
    updatedAt: number
    _all: number
  }


  export type UserCredentialMinAggregateInputType = {
    id?: true
    authProviderId?: true
    passwordHash?: true
    updatedAt?: true
  }

  export type UserCredentialMaxAggregateInputType = {
    id?: true
    authProviderId?: true
    passwordHash?: true
    updatedAt?: true
  }

  export type UserCredentialCountAggregateInputType = {
    id?: true
    authProviderId?: true
    passwordHash?: true
    updatedAt?: true
    _all?: true
  }

  export type UserCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCredential to aggregate.
     */
    where?: UserCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialOrderByWithRelationInput | UserCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCredentials
    **/
    _count?: true | UserCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCredentialMaxAggregateInputType
  }

  export type GetUserCredentialAggregateType<T extends UserCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCredential[P]>
      : GetScalarType<T[P], AggregateUserCredential[P]>
  }




  export type UserCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCredentialWhereInput
    orderBy?: UserCredentialOrderByWithAggregationInput | UserCredentialOrderByWithAggregationInput[]
    by: UserCredentialScalarFieldEnum[] | UserCredentialScalarFieldEnum
    having?: UserCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCredentialCountAggregateInputType | true
    _min?: UserCredentialMinAggregateInputType
    _max?: UserCredentialMaxAggregateInputType
  }

  export type UserCredentialGroupByOutputType = {
    id: string
    authProviderId: string
    passwordHash: string
    updatedAt: Date
    _count: UserCredentialCountAggregateOutputType | null
    _min: UserCredentialMinAggregateOutputType | null
    _max: UserCredentialMaxAggregateOutputType | null
  }

  type GetUserCredentialGroupByPayload<T extends UserCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], UserCredentialGroupByOutputType[P]>
        }
      >
    >


  export type UserCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authProviderId?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
    authProvider?: boolean | AuthProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCredential"]>

  export type UserCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authProviderId?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
    authProvider?: boolean | AuthProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCredential"]>

  export type UserCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authProviderId?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
    authProvider?: boolean | AuthProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCredential"]>

  export type UserCredentialSelectScalar = {
    id?: boolean
    authProviderId?: boolean
    passwordHash?: boolean
    updatedAt?: boolean
  }

  export type UserCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authProviderId" | "passwordHash" | "updatedAt", ExtArgs["result"]["userCredential"]>
  export type UserCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProvider?: boolean | AuthProviderDefaultArgs<ExtArgs>
  }
  export type UserCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProvider?: boolean | AuthProviderDefaultArgs<ExtArgs>
  }
  export type UserCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProvider?: boolean | AuthProviderDefaultArgs<ExtArgs>
  }

  export type $UserCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCredential"
    objects: {
      authProvider: Prisma.$AuthProviderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authProviderId: string
      passwordHash: string
      updatedAt: Date
    }, ExtArgs["result"]["userCredential"]>
    composites: {}
  }

  type UserCredentialGetPayload<S extends boolean | null | undefined | UserCredentialDefaultArgs> = $Result.GetResult<Prisma.$UserCredentialPayload, S>

  type UserCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCredentialCountAggregateInputType | true
    }

  export interface UserCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCredential'], meta: { name: 'UserCredential' } }
    /**
     * Find zero or one UserCredential that matches the filter.
     * @param {UserCredentialFindUniqueArgs} args - Arguments to find a UserCredential
     * @example
     * // Get one UserCredential
     * const userCredential = await prisma.userCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCredentialFindUniqueArgs>(args: SelectSubset<T, UserCredentialFindUniqueArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCredentialFindUniqueOrThrowArgs} args - Arguments to find a UserCredential
     * @example
     * // Get one UserCredential
     * const userCredential = await prisma.userCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialFindFirstArgs} args - Arguments to find a UserCredential
     * @example
     * // Get one UserCredential
     * const userCredential = await prisma.userCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCredentialFindFirstArgs>(args?: SelectSubset<T, UserCredentialFindFirstArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialFindFirstOrThrowArgs} args - Arguments to find a UserCredential
     * @example
     * // Get one UserCredential
     * const userCredential = await prisma.userCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCredentials
     * const userCredentials = await prisma.userCredential.findMany()
     * 
     * // Get first 10 UserCredentials
     * const userCredentials = await prisma.userCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCredentialWithIdOnly = await prisma.userCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCredentialFindManyArgs>(args?: SelectSubset<T, UserCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCredential.
     * @param {UserCredentialCreateArgs} args - Arguments to create a UserCredential.
     * @example
     * // Create one UserCredential
     * const UserCredential = await prisma.userCredential.create({
     *   data: {
     *     // ... data to create a UserCredential
     *   }
     * })
     * 
     */
    create<T extends UserCredentialCreateArgs>(args: SelectSubset<T, UserCredentialCreateArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCredentials.
     * @param {UserCredentialCreateManyArgs} args - Arguments to create many UserCredentials.
     * @example
     * // Create many UserCredentials
     * const userCredential = await prisma.userCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCredentialCreateManyArgs>(args?: SelectSubset<T, UserCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCredentials and returns the data saved in the database.
     * @param {UserCredentialCreateManyAndReturnArgs} args - Arguments to create many UserCredentials.
     * @example
     * // Create many UserCredentials
     * const userCredential = await prisma.userCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCredentials and only return the `id`
     * const userCredentialWithIdOnly = await prisma.userCredential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCredential.
     * @param {UserCredentialDeleteArgs} args - Arguments to delete one UserCredential.
     * @example
     * // Delete one UserCredential
     * const UserCredential = await prisma.userCredential.delete({
     *   where: {
     *     // ... filter to delete one UserCredential
     *   }
     * })
     * 
     */
    delete<T extends UserCredentialDeleteArgs>(args: SelectSubset<T, UserCredentialDeleteArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCredential.
     * @param {UserCredentialUpdateArgs} args - Arguments to update one UserCredential.
     * @example
     * // Update one UserCredential
     * const userCredential = await prisma.userCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCredentialUpdateArgs>(args: SelectSubset<T, UserCredentialUpdateArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCredentials.
     * @param {UserCredentialDeleteManyArgs} args - Arguments to filter UserCredentials to delete.
     * @example
     * // Delete a few UserCredentials
     * const { count } = await prisma.userCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCredentialDeleteManyArgs>(args?: SelectSubset<T, UserCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCredentials
     * const userCredential = await prisma.userCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCredentialUpdateManyArgs>(args: SelectSubset<T, UserCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCredentials and returns the data updated in the database.
     * @param {UserCredentialUpdateManyAndReturnArgs} args - Arguments to update many UserCredentials.
     * @example
     * // Update many UserCredentials
     * const userCredential = await prisma.userCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCredentials and only return the `id`
     * const userCredentialWithIdOnly = await prisma.userCredential.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCredential.
     * @param {UserCredentialUpsertArgs} args - Arguments to update or create a UserCredential.
     * @example
     * // Update or create a UserCredential
     * const userCredential = await prisma.userCredential.upsert({
     *   create: {
     *     // ... data to create a UserCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCredential we want to update
     *   }
     * })
     */
    upsert<T extends UserCredentialUpsertArgs>(args: SelectSubset<T, UserCredentialUpsertArgs<ExtArgs>>): Prisma__UserCredentialClient<$Result.GetResult<Prisma.$UserCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialCountArgs} args - Arguments to filter UserCredentials to count.
     * @example
     * // Count the number of UserCredentials
     * const count = await prisma.userCredential.count({
     *   where: {
     *     // ... the filter for the UserCredentials we want to count
     *   }
     * })
    **/
    count<T extends UserCredentialCountArgs>(
      args?: Subset<T, UserCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCredentialAggregateArgs>(args: Subset<T, UserCredentialAggregateArgs>): Prisma.PrismaPromise<GetUserCredentialAggregateType<T>>

    /**
     * Group by UserCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCredentialGroupByArgs['orderBy'] }
        : { orderBy?: UserCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCredential model
   */
  readonly fields: UserCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authProvider<T extends AuthProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthProviderDefaultArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCredential model
   */
  interface UserCredentialFieldRefs {
    readonly id: FieldRef<"UserCredential", 'String'>
    readonly authProviderId: FieldRef<"UserCredential", 'String'>
    readonly passwordHash: FieldRef<"UserCredential", 'String'>
    readonly updatedAt: FieldRef<"UserCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCredential findUnique
   */
  export type UserCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * Filter, which UserCredential to fetch.
     */
    where: UserCredentialWhereUniqueInput
  }

  /**
   * UserCredential findUniqueOrThrow
   */
  export type UserCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * Filter, which UserCredential to fetch.
     */
    where: UserCredentialWhereUniqueInput
  }

  /**
   * UserCredential findFirst
   */
  export type UserCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * Filter, which UserCredential to fetch.
     */
    where?: UserCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialOrderByWithRelationInput | UserCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCredentials.
     */
    cursor?: UserCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCredentials.
     */
    distinct?: UserCredentialScalarFieldEnum | UserCredentialScalarFieldEnum[]
  }

  /**
   * UserCredential findFirstOrThrow
   */
  export type UserCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * Filter, which UserCredential to fetch.
     */
    where?: UserCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialOrderByWithRelationInput | UserCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCredentials.
     */
    cursor?: UserCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCredentials.
     */
    distinct?: UserCredentialScalarFieldEnum | UserCredentialScalarFieldEnum[]
  }

  /**
   * UserCredential findMany
   */
  export type UserCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * Filter, which UserCredentials to fetch.
     */
    where?: UserCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCredentials to fetch.
     */
    orderBy?: UserCredentialOrderByWithRelationInput | UserCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCredentials.
     */
    cursor?: UserCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCredentials.
     */
    skip?: number
    distinct?: UserCredentialScalarFieldEnum | UserCredentialScalarFieldEnum[]
  }

  /**
   * UserCredential create
   */
  export type UserCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCredential.
     */
    data: XOR<UserCredentialCreateInput, UserCredentialUncheckedCreateInput>
  }

  /**
   * UserCredential createMany
   */
  export type UserCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCredentials.
     */
    data: UserCredentialCreateManyInput | UserCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCredential createManyAndReturn
   */
  export type UserCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many UserCredentials.
     */
    data: UserCredentialCreateManyInput | UserCredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCredential update
   */
  export type UserCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCredential.
     */
    data: XOR<UserCredentialUpdateInput, UserCredentialUncheckedUpdateInput>
    /**
     * Choose, which UserCredential to update.
     */
    where: UserCredentialWhereUniqueInput
  }

  /**
   * UserCredential updateMany
   */
  export type UserCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCredentials.
     */
    data: XOR<UserCredentialUpdateManyMutationInput, UserCredentialUncheckedUpdateManyInput>
    /**
     * Filter which UserCredentials to update
     */
    where?: UserCredentialWhereInput
    /**
     * Limit how many UserCredentials to update.
     */
    limit?: number
  }

  /**
   * UserCredential updateManyAndReturn
   */
  export type UserCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * The data used to update UserCredentials.
     */
    data: XOR<UserCredentialUpdateManyMutationInput, UserCredentialUncheckedUpdateManyInput>
    /**
     * Filter which UserCredentials to update
     */
    where?: UserCredentialWhereInput
    /**
     * Limit how many UserCredentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCredential upsert
   */
  export type UserCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCredential to update in case it exists.
     */
    where: UserCredentialWhereUniqueInput
    /**
     * In case the UserCredential found by the `where` argument doesn't exist, create a new UserCredential with this data.
     */
    create: XOR<UserCredentialCreateInput, UserCredentialUncheckedCreateInput>
    /**
     * In case the UserCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCredentialUpdateInput, UserCredentialUncheckedUpdateInput>
  }

  /**
   * UserCredential delete
   */
  export type UserCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
    /**
     * Filter which UserCredential to delete.
     */
    where: UserCredentialWhereUniqueInput
  }

  /**
   * UserCredential deleteMany
   */
  export type UserCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCredentials to delete
     */
    where?: UserCredentialWhereInput
    /**
     * Limit how many UserCredentials to delete.
     */
    limit?: number
  }

  /**
   * UserCredential without action
   */
  export type UserCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCredential
     */
    select?: UserCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCredential
     */
    omit?: UserCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCredentialInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    tokenHash: string | null
    deviceInfo: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    replacedBy: string | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    tokenHash: string | null
    deviceInfo: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    replacedBy: string | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    adminUserId: number
    tokenHash: number
    deviceInfo: number
    expiresAt: number
    revokedAt: number
    replacedBy: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    adminUserId?: true
    tokenHash?: true
    deviceInfo?: true
    expiresAt?: true
    revokedAt?: true
    replacedBy?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    tokenHash?: true
    deviceInfo?: true
    expiresAt?: true
    revokedAt?: true
    replacedBy?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    adminUserId?: true
    tokenHash?: true
    deviceInfo?: true
    expiresAt?: true
    revokedAt?: true
    replacedBy?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    adminUserId: string
    tokenHash: string
    deviceInfo: string | null
    expiresAt: Date
    revokedAt: Date | null
    replacedBy: string | null
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    replacedBy?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    replacedBy?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    replacedBy?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    replacedBy?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminUserId" | "tokenHash" | "deviceInfo" | "expiresAt" | "revokedAt" | "replacedBy" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      adminUser: Prisma.$AdminUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string
      tokenHash: string
      deviceInfo: string | null
      expiresAt: Date
      revokedAt: Date | null
      replacedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminUser<T extends AdminUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminUserDefaultArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly adminUserId: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly deviceInfo: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly replacedBy: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model LoginAttempt
   */

  export type AggregateLoginAttempt = {
    _count: LoginAttemptCountAggregateOutputType | null
    _min: LoginAttemptMinAggregateOutputType | null
    _max: LoginAttemptMaxAggregateOutputType | null
  }

  export type LoginAttemptMinAggregateOutputType = {
    id: string | null
    email: string | null
    ipAddress: string | null
    success: boolean | null
    createdAt: Date | null
  }

  export type LoginAttemptMaxAggregateOutputType = {
    id: string | null
    email: string | null
    ipAddress: string | null
    success: boolean | null
    createdAt: Date | null
  }

  export type LoginAttemptCountAggregateOutputType = {
    id: number
    email: number
    ipAddress: number
    success: number
    createdAt: number
    _all: number
  }


  export type LoginAttemptMinAggregateInputType = {
    id?: true
    email?: true
    ipAddress?: true
    success?: true
    createdAt?: true
  }

  export type LoginAttemptMaxAggregateInputType = {
    id?: true
    email?: true
    ipAddress?: true
    success?: true
    createdAt?: true
  }

  export type LoginAttemptCountAggregateInputType = {
    id?: true
    email?: true
    ipAddress?: true
    success?: true
    createdAt?: true
    _all?: true
  }

  export type LoginAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginAttempt to aggregate.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoginAttempts
    **/
    _count?: true | LoginAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoginAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoginAttemptMaxAggregateInputType
  }

  export type GetLoginAttemptAggregateType<T extends LoginAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateLoginAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoginAttempt[P]>
      : GetScalarType<T[P], AggregateLoginAttempt[P]>
  }




  export type LoginAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoginAttemptWhereInput
    orderBy?: LoginAttemptOrderByWithAggregationInput | LoginAttemptOrderByWithAggregationInput[]
    by: LoginAttemptScalarFieldEnum[] | LoginAttemptScalarFieldEnum
    having?: LoginAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoginAttemptCountAggregateInputType | true
    _min?: LoginAttemptMinAggregateInputType
    _max?: LoginAttemptMaxAggregateInputType
  }

  export type LoginAttemptGroupByOutputType = {
    id: string
    email: string
    ipAddress: string | null
    success: boolean
    createdAt: Date
    _count: LoginAttemptCountAggregateOutputType | null
    _min: LoginAttemptMinAggregateOutputType | null
    _max: LoginAttemptMaxAggregateOutputType | null
  }

  type GetLoginAttemptGroupByPayload<T extends LoginAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoginAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoginAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], LoginAttemptGroupByOutputType[P]>
        }
      >
    >


  export type LoginAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    ipAddress?: boolean
    success?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["loginAttempt"]>

  export type LoginAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    ipAddress?: boolean
    success?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["loginAttempt"]>

  export type LoginAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    ipAddress?: boolean
    success?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["loginAttempt"]>

  export type LoginAttemptSelectScalar = {
    id?: boolean
    email?: boolean
    ipAddress?: boolean
    success?: boolean
    createdAt?: boolean
  }

  export type LoginAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "ipAddress" | "success" | "createdAt", ExtArgs["result"]["loginAttempt"]>

  export type $LoginAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoginAttempt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      ipAddress: string | null
      success: boolean
      createdAt: Date
    }, ExtArgs["result"]["loginAttempt"]>
    composites: {}
  }

  type LoginAttemptGetPayload<S extends boolean | null | undefined | LoginAttemptDefaultArgs> = $Result.GetResult<Prisma.$LoginAttemptPayload, S>

  type LoginAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoginAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoginAttemptCountAggregateInputType | true
    }

  export interface LoginAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoginAttempt'], meta: { name: 'LoginAttempt' } }
    /**
     * Find zero or one LoginAttempt that matches the filter.
     * @param {LoginAttemptFindUniqueArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoginAttemptFindUniqueArgs>(args: SelectSubset<T, LoginAttemptFindUniqueArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoginAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoginAttemptFindUniqueOrThrowArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoginAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, LoginAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoginAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindFirstArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoginAttemptFindFirstArgs>(args?: SelectSubset<T, LoginAttemptFindFirstArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoginAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindFirstOrThrowArgs} args - Arguments to find a LoginAttempt
     * @example
     * // Get one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoginAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, LoginAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoginAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoginAttempts
     * const loginAttempts = await prisma.loginAttempt.findMany()
     * 
     * // Get first 10 LoginAttempts
     * const loginAttempts = await prisma.loginAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loginAttemptWithIdOnly = await prisma.loginAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoginAttemptFindManyArgs>(args?: SelectSubset<T, LoginAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoginAttempt.
     * @param {LoginAttemptCreateArgs} args - Arguments to create a LoginAttempt.
     * @example
     * // Create one LoginAttempt
     * const LoginAttempt = await prisma.loginAttempt.create({
     *   data: {
     *     // ... data to create a LoginAttempt
     *   }
     * })
     * 
     */
    create<T extends LoginAttemptCreateArgs>(args: SelectSubset<T, LoginAttemptCreateArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoginAttempts.
     * @param {LoginAttemptCreateManyArgs} args - Arguments to create many LoginAttempts.
     * @example
     * // Create many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoginAttemptCreateManyArgs>(args?: SelectSubset<T, LoginAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoginAttempts and returns the data saved in the database.
     * @param {LoginAttemptCreateManyAndReturnArgs} args - Arguments to create many LoginAttempts.
     * @example
     * // Create many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoginAttempts and only return the `id`
     * const loginAttemptWithIdOnly = await prisma.loginAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoginAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, LoginAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoginAttempt.
     * @param {LoginAttemptDeleteArgs} args - Arguments to delete one LoginAttempt.
     * @example
     * // Delete one LoginAttempt
     * const LoginAttempt = await prisma.loginAttempt.delete({
     *   where: {
     *     // ... filter to delete one LoginAttempt
     *   }
     * })
     * 
     */
    delete<T extends LoginAttemptDeleteArgs>(args: SelectSubset<T, LoginAttemptDeleteArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoginAttempt.
     * @param {LoginAttemptUpdateArgs} args - Arguments to update one LoginAttempt.
     * @example
     * // Update one LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoginAttemptUpdateArgs>(args: SelectSubset<T, LoginAttemptUpdateArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoginAttempts.
     * @param {LoginAttemptDeleteManyArgs} args - Arguments to filter LoginAttempts to delete.
     * @example
     * // Delete a few LoginAttempts
     * const { count } = await prisma.loginAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoginAttemptDeleteManyArgs>(args?: SelectSubset<T, LoginAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoginAttemptUpdateManyArgs>(args: SelectSubset<T, LoginAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginAttempts and returns the data updated in the database.
     * @param {LoginAttemptUpdateManyAndReturnArgs} args - Arguments to update many LoginAttempts.
     * @example
     * // Update many LoginAttempts
     * const loginAttempt = await prisma.loginAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoginAttempts and only return the `id`
     * const loginAttemptWithIdOnly = await prisma.loginAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoginAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, LoginAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoginAttempt.
     * @param {LoginAttemptUpsertArgs} args - Arguments to update or create a LoginAttempt.
     * @example
     * // Update or create a LoginAttempt
     * const loginAttempt = await prisma.loginAttempt.upsert({
     *   create: {
     *     // ... data to create a LoginAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoginAttempt we want to update
     *   }
     * })
     */
    upsert<T extends LoginAttemptUpsertArgs>(args: SelectSubset<T, LoginAttemptUpsertArgs<ExtArgs>>): Prisma__LoginAttemptClient<$Result.GetResult<Prisma.$LoginAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoginAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptCountArgs} args - Arguments to filter LoginAttempts to count.
     * @example
     * // Count the number of LoginAttempts
     * const count = await prisma.loginAttempt.count({
     *   where: {
     *     // ... the filter for the LoginAttempts we want to count
     *   }
     * })
    **/
    count<T extends LoginAttemptCountArgs>(
      args?: Subset<T, LoginAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoginAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoginAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoginAttemptAggregateArgs>(args: Subset<T, LoginAttemptAggregateArgs>): Prisma.PrismaPromise<GetLoginAttemptAggregateType<T>>

    /**
     * Group by LoginAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoginAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoginAttemptGroupByArgs['orderBy'] }
        : { orderBy?: LoginAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoginAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoginAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoginAttempt model
   */
  readonly fields: LoginAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoginAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoginAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoginAttempt model
   */
  interface LoginAttemptFieldRefs {
    readonly id: FieldRef<"LoginAttempt", 'String'>
    readonly email: FieldRef<"LoginAttempt", 'String'>
    readonly ipAddress: FieldRef<"LoginAttempt", 'String'>
    readonly success: FieldRef<"LoginAttempt", 'Boolean'>
    readonly createdAt: FieldRef<"LoginAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoginAttempt findUnique
   */
  export type LoginAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt findUniqueOrThrow
   */
  export type LoginAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt findFirst
   */
  export type LoginAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginAttempts.
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginAttempts.
     */
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * LoginAttempt findFirstOrThrow
   */
  export type LoginAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LoginAttempt to fetch.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginAttempts.
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginAttempts.
     */
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * LoginAttempt findMany
   */
  export type LoginAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * Filter, which LoginAttempts to fetch.
     */
    where?: LoginAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginAttempts to fetch.
     */
    orderBy?: LoginAttemptOrderByWithRelationInput | LoginAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoginAttempts.
     */
    cursor?: LoginAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginAttempts.
     */
    skip?: number
    distinct?: LoginAttemptScalarFieldEnum | LoginAttemptScalarFieldEnum[]
  }

  /**
   * LoginAttempt create
   */
  export type LoginAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * The data needed to create a LoginAttempt.
     */
    data: XOR<LoginAttemptCreateInput, LoginAttemptUncheckedCreateInput>
  }

  /**
   * LoginAttempt createMany
   */
  export type LoginAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoginAttempts.
     */
    data: LoginAttemptCreateManyInput | LoginAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoginAttempt createManyAndReturn
   */
  export type LoginAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many LoginAttempts.
     */
    data: LoginAttemptCreateManyInput | LoginAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoginAttempt update
   */
  export type LoginAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * The data needed to update a LoginAttempt.
     */
    data: XOR<LoginAttemptUpdateInput, LoginAttemptUncheckedUpdateInput>
    /**
     * Choose, which LoginAttempt to update.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt updateMany
   */
  export type LoginAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoginAttempts.
     */
    data: XOR<LoginAttemptUpdateManyMutationInput, LoginAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LoginAttempts to update
     */
    where?: LoginAttemptWhereInput
    /**
     * Limit how many LoginAttempts to update.
     */
    limit?: number
  }

  /**
   * LoginAttempt updateManyAndReturn
   */
  export type LoginAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * The data used to update LoginAttempts.
     */
    data: XOR<LoginAttemptUpdateManyMutationInput, LoginAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LoginAttempts to update
     */
    where?: LoginAttemptWhereInput
    /**
     * Limit how many LoginAttempts to update.
     */
    limit?: number
  }

  /**
   * LoginAttempt upsert
   */
  export type LoginAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * The filter to search for the LoginAttempt to update in case it exists.
     */
    where: LoginAttemptWhereUniqueInput
    /**
     * In case the LoginAttempt found by the `where` argument doesn't exist, create a new LoginAttempt with this data.
     */
    create: XOR<LoginAttemptCreateInput, LoginAttemptUncheckedCreateInput>
    /**
     * In case the LoginAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoginAttemptUpdateInput, LoginAttemptUncheckedUpdateInput>
  }

  /**
   * LoginAttempt delete
   */
  export type LoginAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
    /**
     * Filter which LoginAttempt to delete.
     */
    where: LoginAttemptWhereUniqueInput
  }

  /**
   * LoginAttempt deleteMany
   */
  export type LoginAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginAttempts to delete
     */
    where?: LoginAttemptWhereInput
    /**
     * Limit how many LoginAttempts to delete.
     */
    limit?: number
  }

  /**
   * LoginAttempt without action
   */
  export type LoginAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginAttempt
     */
    select?: LoginAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginAttempt
     */
    omit?: LoginAttemptOmit<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    adminUserId: number
    tokenHash: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    adminUserId?: true
    tokenHash?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    tokenHash?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    adminUserId?: true
    tokenHash?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    adminUserId: string
    tokenHash: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminUserId" | "tokenHash" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      adminUser: Prisma.$AdminUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string
      tokenHash: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminUser<T extends AdminUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminUserDefaultArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly adminUserId: FieldRef<"PasswordResetToken", 'String'>
    readonly tokenHash: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly usedAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    emailVerifiedAt: 'emailVerifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const BusinessScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    logoPath: 'logoPath',
    imagePath: 'imagePath',
    phone: 'phone',
    email: 'email',
    website: 'website',
    telegram: 'telegram',
    vk: 'vk',
    youtube: 'youtube',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusinessScalarFieldEnum = (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum]


  export const BusinessMemberScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    businessId: 'businessId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type BusinessMemberScalarFieldEnum = (typeof BusinessMemberScalarFieldEnum)[keyof typeof BusinessMemberScalarFieldEnum]


  export const ServiceCategoryScalarFieldEnum: {
    id: 'id',
    businessId: 'businessId',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceCategoryScalarFieldEnum = (typeof ServiceCategoryScalarFieldEnum)[keyof typeof ServiceCategoryScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    businessId: 'businessId',
    categoryId: 'categoryId',
    name: 'name',
    description: 'description',
    price: 'price',
    durationMinutes: 'durationMinutes',
    breakAfterMinutes: 'breakAfterMinutes',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    businessId: 'businessId',
    name: 'name',
    specialization: 'specialization',
    imagePath: 'imagePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const EmployeeServiceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    serviceId: 'serviceId',
    createdAt: 'createdAt'
  };

  export type EmployeeServiceScalarFieldEnum = (typeof EmployeeServiceScalarFieldEnum)[keyof typeof EmployeeServiceScalarFieldEnum]


  export const AuthProviderScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    type: 'type',
    providerId: 'providerId',
    createdAt: 'createdAt'
  };

  export type AuthProviderScalarFieldEnum = (typeof AuthProviderScalarFieldEnum)[keyof typeof AuthProviderScalarFieldEnum]


  export const UserCredentialScalarFieldEnum: {
    id: 'id',
    authProviderId: 'authProviderId',
    passwordHash: 'passwordHash',
    updatedAt: 'updatedAt'
  };

  export type UserCredentialScalarFieldEnum = (typeof UserCredentialScalarFieldEnum)[keyof typeof UserCredentialScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    tokenHash: 'tokenHash',
    deviceInfo: 'deviceInfo',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    replacedBy: 'replacedBy',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const LoginAttemptScalarFieldEnum: {
    id: 'id',
    email: 'email',
    ipAddress: 'ipAddress',
    success: 'success',
    createdAt: 'createdAt'
  };

  export type LoginAttemptScalarFieldEnum = (typeof LoginAttemptScalarFieldEnum)[keyof typeof LoginAttemptScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BusinessRole'
   */
  export type EnumBusinessRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessRole'>
    


  /**
   * Reference to a field of type 'BusinessRole[]'
   */
  export type ListEnumBusinessRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessRole[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AuthProviderType'
   */
  export type EnumAuthProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProviderType'>
    


  /**
   * Reference to a field of type 'AuthProviderType[]'
   */
  export type ListEnumAuthProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProviderType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    email?: StringNullableFilter<"AdminUser"> | string | null
    firstName?: StringNullableFilter<"AdminUser"> | string | null
    lastName?: StringNullableFilter<"AdminUser"> | string | null
    emailVerifiedAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    authProviders?: AuthProviderListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    passwordResetTokens?: PasswordResetTokenListRelationFilter
    businessMembers?: BusinessMemberListRelationFilter
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authProviders?: AuthProviderOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    passwordResetTokens?: PasswordResetTokenOrderByRelationAggregateInput
    businessMembers?: BusinessMemberOrderByRelationAggregateInput
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    firstName?: StringNullableFilter<"AdminUser"> | string | null
    lastName?: StringNullableFilter<"AdminUser"> | string | null
    emailVerifiedAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    authProviders?: AuthProviderListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    passwordResetTokens?: PasswordResetTokenListRelationFilter
    businessMembers?: BusinessMemberListRelationFilter
  }, "id" | "email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    email?: StringNullableWithAggregatesFilter<"AdminUser"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"AdminUser"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"AdminUser"> | string | null
    emailVerifiedAt?: DateTimeNullableWithAggregatesFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type BusinessWhereInput = {
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    id?: StringFilter<"Business"> | string
    name?: StringNullableFilter<"Business"> | string | null
    description?: StringNullableFilter<"Business"> | string | null
    logoPath?: StringNullableFilter<"Business"> | string | null
    imagePath?: StringNullableFilter<"Business"> | string | null
    phone?: StringNullableFilter<"Business"> | string | null
    email?: StringNullableFilter<"Business"> | string | null
    website?: StringNullableFilter<"Business"> | string | null
    telegram?: StringNullableFilter<"Business"> | string | null
    vk?: StringNullableFilter<"Business"> | string | null
    youtube?: StringNullableFilter<"Business"> | string | null
    address?: StringNullableFilter<"Business"> | string | null
    latitude?: FloatNullableFilter<"Business"> | number | null
    longitude?: FloatNullableFilter<"Business"> | number | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    businessMembers?: BusinessMemberListRelationFilter
    serviceCategories?: ServiceCategoryListRelationFilter
    services?: ServiceListRelationFilter
    employees?: EmployeeListRelationFilter
  }

  export type BusinessOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    logoPath?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    vk?: SortOrderInput | SortOrder
    youtube?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    businessMembers?: BusinessMemberOrderByRelationAggregateInput
    serviceCategories?: ServiceCategoryOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    employees?: EmployeeOrderByRelationAggregateInput
  }

  export type BusinessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    name?: StringNullableFilter<"Business"> | string | null
    description?: StringNullableFilter<"Business"> | string | null
    logoPath?: StringNullableFilter<"Business"> | string | null
    imagePath?: StringNullableFilter<"Business"> | string | null
    phone?: StringNullableFilter<"Business"> | string | null
    email?: StringNullableFilter<"Business"> | string | null
    website?: StringNullableFilter<"Business"> | string | null
    telegram?: StringNullableFilter<"Business"> | string | null
    vk?: StringNullableFilter<"Business"> | string | null
    youtube?: StringNullableFilter<"Business"> | string | null
    address?: StringNullableFilter<"Business"> | string | null
    latitude?: FloatNullableFilter<"Business"> | number | null
    longitude?: FloatNullableFilter<"Business"> | number | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    businessMembers?: BusinessMemberListRelationFilter
    serviceCategories?: ServiceCategoryListRelationFilter
    services?: ServiceListRelationFilter
    employees?: EmployeeListRelationFilter
  }, "id">

  export type BusinessOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    logoPath?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    vk?: SortOrderInput | SortOrder
    youtube?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BusinessCountOrderByAggregateInput
    _avg?: BusinessAvgOrderByAggregateInput
    _max?: BusinessMaxOrderByAggregateInput
    _min?: BusinessMinOrderByAggregateInput
    _sum?: BusinessSumOrderByAggregateInput
  }

  export type BusinessScalarWhereWithAggregatesInput = {
    AND?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    OR?: BusinessScalarWhereWithAggregatesInput[]
    NOT?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Business"> | string
    name?: StringNullableWithAggregatesFilter<"Business"> | string | null
    description?: StringNullableWithAggregatesFilter<"Business"> | string | null
    logoPath?: StringNullableWithAggregatesFilter<"Business"> | string | null
    imagePath?: StringNullableWithAggregatesFilter<"Business"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Business"> | string | null
    email?: StringNullableWithAggregatesFilter<"Business"> | string | null
    website?: StringNullableWithAggregatesFilter<"Business"> | string | null
    telegram?: StringNullableWithAggregatesFilter<"Business"> | string | null
    vk?: StringNullableWithAggregatesFilter<"Business"> | string | null
    youtube?: StringNullableWithAggregatesFilter<"Business"> | string | null
    address?: StringNullableWithAggregatesFilter<"Business"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Business"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Business"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
  }

  export type BusinessMemberWhereInput = {
    AND?: BusinessMemberWhereInput | BusinessMemberWhereInput[]
    OR?: BusinessMemberWhereInput[]
    NOT?: BusinessMemberWhereInput | BusinessMemberWhereInput[]
    id?: StringFilter<"BusinessMember"> | string
    adminUserId?: StringFilter<"BusinessMember"> | string
    businessId?: StringFilter<"BusinessMember"> | string
    role?: EnumBusinessRoleFilter<"BusinessMember"> | $Enums.BusinessRole
    createdAt?: DateTimeFilter<"BusinessMember"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }

  export type BusinessMemberOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    adminUser?: AdminUserOrderByWithRelationInput
    business?: BusinessOrderByWithRelationInput
  }

  export type BusinessMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    adminUserId_businessId?: BusinessMemberAdminUserIdBusinessIdCompoundUniqueInput
    AND?: BusinessMemberWhereInput | BusinessMemberWhereInput[]
    OR?: BusinessMemberWhereInput[]
    NOT?: BusinessMemberWhereInput | BusinessMemberWhereInput[]
    adminUserId?: StringFilter<"BusinessMember"> | string
    businessId?: StringFilter<"BusinessMember"> | string
    role?: EnumBusinessRoleFilter<"BusinessMember"> | $Enums.BusinessRole
    createdAt?: DateTimeFilter<"BusinessMember"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }, "id" | "adminUserId_businessId">

  export type BusinessMemberOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: BusinessMemberCountOrderByAggregateInput
    _max?: BusinessMemberMaxOrderByAggregateInput
    _min?: BusinessMemberMinOrderByAggregateInput
  }

  export type BusinessMemberScalarWhereWithAggregatesInput = {
    AND?: BusinessMemberScalarWhereWithAggregatesInput | BusinessMemberScalarWhereWithAggregatesInput[]
    OR?: BusinessMemberScalarWhereWithAggregatesInput[]
    NOT?: BusinessMemberScalarWhereWithAggregatesInput | BusinessMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessMember"> | string
    adminUserId?: StringWithAggregatesFilter<"BusinessMember"> | string
    businessId?: StringWithAggregatesFilter<"BusinessMember"> | string
    role?: EnumBusinessRoleWithAggregatesFilter<"BusinessMember"> | $Enums.BusinessRole
    createdAt?: DateTimeWithAggregatesFilter<"BusinessMember"> | Date | string
  }

  export type ServiceCategoryWhereInput = {
    AND?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    OR?: ServiceCategoryWhereInput[]
    NOT?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    id?: StringFilter<"ServiceCategory"> | string
    businessId?: StringFilter<"ServiceCategory"> | string
    name?: StringFilter<"ServiceCategory"> | string
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
    services?: ServiceListRelationFilter
  }

  export type ServiceCategoryOrderByWithRelationInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: BusinessOrderByWithRelationInput
    services?: ServiceOrderByRelationAggregateInput
  }

  export type ServiceCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    businessId_name?: ServiceCategoryBusinessIdNameCompoundUniqueInput
    AND?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    OR?: ServiceCategoryWhereInput[]
    NOT?: ServiceCategoryWhereInput | ServiceCategoryWhereInput[]
    businessId?: StringFilter<"ServiceCategory"> | string
    name?: StringFilter<"ServiceCategory"> | string
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
    services?: ServiceListRelationFilter
  }, "id" | "businessId_name">

  export type ServiceCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCategoryCountOrderByAggregateInput
    _max?: ServiceCategoryMaxOrderByAggregateInput
    _min?: ServiceCategoryMinOrderByAggregateInput
  }

  export type ServiceCategoryScalarWhereWithAggregatesInput = {
    AND?: ServiceCategoryScalarWhereWithAggregatesInput | ServiceCategoryScalarWhereWithAggregatesInput[]
    OR?: ServiceCategoryScalarWhereWithAggregatesInput[]
    NOT?: ServiceCategoryScalarWhereWithAggregatesInput | ServiceCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceCategory"> | string
    businessId?: StringWithAggregatesFilter<"ServiceCategory"> | string
    name?: StringWithAggregatesFilter<"ServiceCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceCategory"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    businessId?: StringFilter<"Service"> | string
    categoryId?: StringNullableFilter<"Service"> | string | null
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFilter<"Service"> | number
    breakAfterMinutes?: IntNullableFilter<"Service"> | number | null
    position?: IntFilter<"Service"> | number
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
    category?: XOR<ServiceCategoryNullableScalarRelationFilter, ServiceCategoryWhereInput> | null
    employeeServices?: EmployeeServiceListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    businessId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrderInput | SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: BusinessOrderByWithRelationInput
    category?: ServiceCategoryOrderByWithRelationInput
    employeeServices?: EmployeeServiceOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    businessId?: StringFilter<"Service"> | string
    categoryId?: StringNullableFilter<"Service"> | string | null
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFilter<"Service"> | number
    breakAfterMinutes?: IntNullableFilter<"Service"> | number | null
    position?: IntFilter<"Service"> | number
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
    category?: XOR<ServiceCategoryNullableScalarRelationFilter, ServiceCategoryWhereInput> | null
    employeeServices?: EmployeeServiceListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    businessId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrderInput | SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    businessId?: StringWithAggregatesFilter<"Service"> | string
    categoryId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    price?: DecimalWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntWithAggregatesFilter<"Service"> | number
    breakAfterMinutes?: IntNullableWithAggregatesFilter<"Service"> | number | null
    position?: IntWithAggregatesFilter<"Service"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    businessId?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    specialization?: StringNullableFilter<"Employee"> | string | null
    imagePath?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
    employeeServices?: EmployeeServiceListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    specialization?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: BusinessOrderByWithRelationInput
    employeeServices?: EmployeeServiceOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    businessId?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    specialization?: StringNullableFilter<"Employee"> | string | null
    imagePath?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
    employeeServices?: EmployeeServiceListRelationFilter
  }, "id">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    specialization?: SortOrderInput | SortOrder
    imagePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    businessId?: StringWithAggregatesFilter<"Employee"> | string
    name?: StringWithAggregatesFilter<"Employee"> | string
    specialization?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    imagePath?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type EmployeeServiceWhereInput = {
    AND?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    OR?: EmployeeServiceWhereInput[]
    NOT?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    id?: StringFilter<"EmployeeService"> | string
    employeeId?: StringFilter<"EmployeeService"> | string
    serviceId?: StringFilter<"EmployeeService"> | string
    createdAt?: DateTimeFilter<"EmployeeService"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type EmployeeServiceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type EmployeeServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId_serviceId?: EmployeeServiceEmployeeIdServiceIdCompoundUniqueInput
    AND?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    OR?: EmployeeServiceWhereInput[]
    NOT?: EmployeeServiceWhereInput | EmployeeServiceWhereInput[]
    employeeId?: StringFilter<"EmployeeService"> | string
    serviceId?: StringFilter<"EmployeeService"> | string
    createdAt?: DateTimeFilter<"EmployeeService"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id" | "employeeId_serviceId">

  export type EmployeeServiceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
    _count?: EmployeeServiceCountOrderByAggregateInput
    _max?: EmployeeServiceMaxOrderByAggregateInput
    _min?: EmployeeServiceMinOrderByAggregateInput
  }

  export type EmployeeServiceScalarWhereWithAggregatesInput = {
    AND?: EmployeeServiceScalarWhereWithAggregatesInput | EmployeeServiceScalarWhereWithAggregatesInput[]
    OR?: EmployeeServiceScalarWhereWithAggregatesInput[]
    NOT?: EmployeeServiceScalarWhereWithAggregatesInput | EmployeeServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeService"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeService"> | string
    serviceId?: StringWithAggregatesFilter<"EmployeeService"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeService"> | Date | string
  }

  export type AuthProviderWhereInput = {
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    id?: StringFilter<"AuthProvider"> | string
    adminUserId?: StringFilter<"AuthProvider"> | string
    type?: EnumAuthProviderTypeFilter<"AuthProvider"> | $Enums.AuthProviderType
    providerId?: StringNullableFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
    credential?: XOR<UserCredentialNullableScalarRelationFilter, UserCredentialWhereInput> | null
  }

  export type AuthProviderOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    type?: SortOrder
    providerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    adminUser?: AdminUserOrderByWithRelationInput
    credential?: UserCredentialOrderByWithRelationInput
  }

  export type AuthProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    adminUserId_type?: AuthProviderAdminUserIdTypeCompoundUniqueInput
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    adminUserId?: StringFilter<"AuthProvider"> | string
    type?: EnumAuthProviderTypeFilter<"AuthProvider"> | $Enums.AuthProviderType
    providerId?: StringNullableFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
    credential?: XOR<UserCredentialNullableScalarRelationFilter, UserCredentialWhereInput> | null
  }, "id" | "adminUserId_type">

  export type AuthProviderOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    type?: SortOrder
    providerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuthProviderCountOrderByAggregateInput
    _max?: AuthProviderMaxOrderByAggregateInput
    _min?: AuthProviderMinOrderByAggregateInput
  }

  export type AuthProviderScalarWhereWithAggregatesInput = {
    AND?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    OR?: AuthProviderScalarWhereWithAggregatesInput[]
    NOT?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthProvider"> | string
    adminUserId?: StringWithAggregatesFilter<"AuthProvider"> | string
    type?: EnumAuthProviderTypeWithAggregatesFilter<"AuthProvider"> | $Enums.AuthProviderType
    providerId?: StringNullableWithAggregatesFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string
  }

  export type UserCredentialWhereInput = {
    AND?: UserCredentialWhereInput | UserCredentialWhereInput[]
    OR?: UserCredentialWhereInput[]
    NOT?: UserCredentialWhereInput | UserCredentialWhereInput[]
    id?: StringFilter<"UserCredential"> | string
    authProviderId?: StringFilter<"UserCredential"> | string
    passwordHash?: StringFilter<"UserCredential"> | string
    updatedAt?: DateTimeFilter<"UserCredential"> | Date | string
    authProvider?: XOR<AuthProviderScalarRelationFilter, AuthProviderWhereInput>
  }

  export type UserCredentialOrderByWithRelationInput = {
    id?: SortOrder
    authProviderId?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
    authProvider?: AuthProviderOrderByWithRelationInput
  }

  export type UserCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    authProviderId?: string
    AND?: UserCredentialWhereInput | UserCredentialWhereInput[]
    OR?: UserCredentialWhereInput[]
    NOT?: UserCredentialWhereInput | UserCredentialWhereInput[]
    passwordHash?: StringFilter<"UserCredential"> | string
    updatedAt?: DateTimeFilter<"UserCredential"> | Date | string
    authProvider?: XOR<AuthProviderScalarRelationFilter, AuthProviderWhereInput>
  }, "id" | "authProviderId">

  export type UserCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    authProviderId?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCredentialCountOrderByAggregateInput
    _max?: UserCredentialMaxOrderByAggregateInput
    _min?: UserCredentialMinOrderByAggregateInput
  }

  export type UserCredentialScalarWhereWithAggregatesInput = {
    AND?: UserCredentialScalarWhereWithAggregatesInput | UserCredentialScalarWhereWithAggregatesInput[]
    OR?: UserCredentialScalarWhereWithAggregatesInput[]
    NOT?: UserCredentialScalarWhereWithAggregatesInput | UserCredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserCredential"> | string
    authProviderId?: StringWithAggregatesFilter<"UserCredential"> | string
    passwordHash?: StringWithAggregatesFilter<"UserCredential"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserCredential"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    adminUserId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    replacedBy?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    replacedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    adminUser?: AdminUserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    adminUserId?: StringFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    replacedBy?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
  }, "id" | "tokenHash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    replacedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    adminUserId?: StringWithAggregatesFilter<"RefreshToken"> | string
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    replacedBy?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type LoginAttemptWhereInput = {
    AND?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    OR?: LoginAttemptWhereInput[]
    NOT?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    id?: StringFilter<"LoginAttempt"> | string
    email?: StringFilter<"LoginAttempt"> | string
    ipAddress?: StringNullableFilter<"LoginAttempt"> | string | null
    success?: BoolFilter<"LoginAttempt"> | boolean
    createdAt?: DateTimeFilter<"LoginAttempt"> | Date | string
  }

  export type LoginAttemptOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    OR?: LoginAttemptWhereInput[]
    NOT?: LoginAttemptWhereInput | LoginAttemptWhereInput[]
    email?: StringFilter<"LoginAttempt"> | string
    ipAddress?: StringNullableFilter<"LoginAttempt"> | string | null
    success?: BoolFilter<"LoginAttempt"> | boolean
    createdAt?: DateTimeFilter<"LoginAttempt"> | Date | string
  }, "id">

  export type LoginAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    success?: SortOrder
    createdAt?: SortOrder
    _count?: LoginAttemptCountOrderByAggregateInput
    _max?: LoginAttemptMaxOrderByAggregateInput
    _min?: LoginAttemptMinOrderByAggregateInput
  }

  export type LoginAttemptScalarWhereWithAggregatesInput = {
    AND?: LoginAttemptScalarWhereWithAggregatesInput | LoginAttemptScalarWhereWithAggregatesInput[]
    OR?: LoginAttemptScalarWhereWithAggregatesInput[]
    NOT?: LoginAttemptScalarWhereWithAggregatesInput | LoginAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoginAttempt"> | string
    email?: StringWithAggregatesFilter<"LoginAttempt"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"LoginAttempt"> | string | null
    success?: BoolWithAggregatesFilter<"LoginAttempt"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LoginAttempt"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    adminUserId?: StringFilter<"PasswordResetToken"> | string
    tokenHash?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    adminUser?: AdminUserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    adminUserId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    adminUser?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
  }, "id" | "tokenHash">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    adminUserId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    tokenHash?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"PasswordResetToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderCreateNestedManyWithoutAdminUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutAdminUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUpdateManyWithoutAdminUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUncheckedUpdateManyWithoutAdminUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserCreateManyInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessCreateInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberCreateNestedManyWithoutBusinessInput
    serviceCategories?: ServiceCategoryCreateNestedManyWithoutBusinessInput
    services?: ServiceCreateNestedManyWithoutBusinessInput
    employees?: EmployeeCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutBusinessInput
    serviceCategories?: ServiceCategoryUncheckedCreateNestedManyWithoutBusinessInput
    services?: ServiceUncheckedCreateNestedManyWithoutBusinessInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUpdateManyWithoutBusinessNestedInput
    serviceCategories?: ServiceCategoryUpdateManyWithoutBusinessNestedInput
    services?: ServiceUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutBusinessNestedInput
    serviceCategories?: ServiceCategoryUncheckedUpdateManyWithoutBusinessNestedInput
    services?: ServiceUncheckedUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessCreateManyInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberCreateInput = {
    id?: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutBusinessMembersInput
    business: BusinessCreateNestedOneWithoutBusinessMembersInput
  }

  export type BusinessMemberUncheckedCreateInput = {
    id?: string
    adminUserId: string
    businessId: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
  }

  export type BusinessMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutBusinessMembersNestedInput
    business?: BusinessUpdateOneRequiredWithoutBusinessMembersNestedInput
  }

  export type BusinessMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberCreateManyInput = {
    id?: string
    adminUserId: string
    businessId: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
  }

  export type BusinessMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutServiceCategoriesInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type ServiceCategoryUncheckedCreateInput = {
    id?: string
    businessId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ServiceCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutServiceCategoriesNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type ServiceCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ServiceCategoryCreateManyInput = {
    id?: string
    businessId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutServicesInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    employeeServices?: EmployeeServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    businessId: string
    categoryId?: string | null
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeServices?: EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutServicesNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    employeeServices?: EmployeeServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeServices?: EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    businessId: string
    categoryId?: string | null
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutEmployeesInput
    employeeServices?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    businessId: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeServices?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutEmployeesNestedInput
    employeeServices?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeServices?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    businessId: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceCreateInput = {
    id?: string
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutEmployeeServicesInput
    service: ServiceCreateNestedOneWithoutEmployeeServicesInput
  }

  export type EmployeeServiceUncheckedCreateInput = {
    id?: string
    employeeId: string
    serviceId: string
    createdAt?: Date | string
  }

  export type EmployeeServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutEmployeeServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutEmployeeServicesNestedInput
  }

  export type EmployeeServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceCreateManyInput = {
    id?: string
    employeeId: string
    serviceId: string
    createdAt?: Date | string
  }

  export type EmployeeServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateInput = {
    id?: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutAuthProvidersInput
    credential?: UserCredentialCreateNestedOneWithoutAuthProviderInput
  }

  export type AuthProviderUncheckedCreateInput = {
    id?: string
    adminUserId: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
    credential?: UserCredentialUncheckedCreateNestedOneWithoutAuthProviderInput
  }

  export type AuthProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutAuthProvidersNestedInput
    credential?: UserCredentialUpdateOneWithoutAuthProviderNestedInput
  }

  export type AuthProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credential?: UserCredentialUncheckedUpdateOneWithoutAuthProviderNestedInput
  }

  export type AuthProviderCreateManyInput = {
    id?: string
    adminUserId: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
  }

  export type AuthProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialCreateInput = {
    id?: string
    passwordHash: string
    updatedAt?: Date | string
    authProvider: AuthProviderCreateNestedOneWithoutCredentialInput
  }

  export type UserCredentialUncheckedCreateInput = {
    id?: string
    authProviderId: string
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserCredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProvider?: AuthProviderUpdateOneRequiredWithoutCredentialNestedInput
  }

  export type UserCredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authProviderId?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialCreateManyInput = {
    id?: string
    authProviderId: string
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserCredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authProviderId?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    tokenHash: string
    deviceInfo?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    replacedBy?: string | null
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    adminUserId: string
    tokenHash: string
    deviceInfo?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    replacedBy?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    adminUserId: string
    tokenHash: string
    deviceInfo?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    replacedBy?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptCreateInput = {
    id?: string
    email: string
    ipAddress?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type LoginAttemptUncheckedCreateInput = {
    id?: string
    email: string
    ipAddress?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type LoginAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptCreateManyInput = {
    id?: string
    email: string
    ipAddress?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type LoginAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutPasswordResetTokensInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    adminUserId: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutPasswordResetTokensNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    adminUserId: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthProviderListRelationFilter = {
    every?: AuthProviderWhereInput
    some?: AuthProviderWhereInput
    none?: AuthProviderWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type PasswordResetTokenListRelationFilter = {
    every?: PasswordResetTokenWhereInput
    some?: PasswordResetTokenWhereInput
    none?: PasswordResetTokenWhereInput
  }

  export type BusinessMemberListRelationFilter = {
    every?: BusinessMemberWhereInput
    some?: BusinessMemberWhereInput
    none?: BusinessMemberWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthProviderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    emailVerifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    emailVerifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    emailVerifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ServiceCategoryListRelationFilter = {
    every?: ServiceCategoryWhereInput
    some?: ServiceCategoryWhereInput
    none?: ServiceCategoryWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type ServiceCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoPath?: SortOrder
    imagePath?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    telegram?: SortOrder
    vk?: SortOrder
    youtube?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type BusinessMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoPath?: SortOrder
    imagePath?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    telegram?: SortOrder
    vk?: SortOrder
    youtube?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoPath?: SortOrder
    imagePath?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    telegram?: SortOrder
    vk?: SortOrder
    youtube?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumBusinessRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleFilter<$PrismaModel> | $Enums.BusinessRole
  }

  export type AdminUserScalarRelationFilter = {
    is?: AdminUserWhereInput
    isNot?: AdminUserWhereInput
  }

  export type BusinessScalarRelationFilter = {
    is?: BusinessWhereInput
    isNot?: BusinessWhereInput
  }

  export type BusinessMemberAdminUserIdBusinessIdCompoundUniqueInput = {
    adminUserId: string
    businessId: string
  }

  export type BusinessMemberCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type BusinessMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type BusinessMemberMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBusinessRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleWithAggregatesFilter<$PrismaModel> | $Enums.BusinessRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessRoleFilter<$PrismaModel>
    _max?: NestedEnumBusinessRoleFilter<$PrismaModel>
  }

  export type ServiceCategoryBusinessIdNameCompoundUniqueInput = {
    businessId: string
    name: string
  }

  export type ServiceCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ServiceCategoryNullableScalarRelationFilter = {
    is?: ServiceCategoryWhereInput | null
    isNot?: ServiceCategoryWhereInput | null
  }

  export type EmployeeServiceListRelationFilter = {
    every?: EmployeeServiceWhereInput
    some?: EmployeeServiceWhereInput
    none?: EmployeeServiceWhereInput
  }

  export type EmployeeServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrder
    position?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    durationMinutes?: SortOrder
    breakAfterMinutes?: SortOrder
    position?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    businessId?: SortOrder
    name?: SortOrder
    specialization?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type EmployeeServiceEmployeeIdServiceIdCompoundUniqueInput = {
    employeeId: string
    serviceId: string
  }

  export type EmployeeServiceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeServiceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    serviceId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuthProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProviderType | EnumAuthProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderTypeFilter<$PrismaModel> | $Enums.AuthProviderType
  }

  export type UserCredentialNullableScalarRelationFilter = {
    is?: UserCredentialWhereInput | null
    isNot?: UserCredentialWhereInput | null
  }

  export type AuthProviderAdminUserIdTypeCompoundUniqueInput = {
    adminUserId: string
    type: $Enums.AuthProviderType
  }

  export type AuthProviderCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    type?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    type?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthProviderMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    type?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuthProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProviderType | EnumAuthProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuthProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderTypeFilter<$PrismaModel>
  }

  export type AuthProviderScalarRelationFilter = {
    is?: AuthProviderWhereInput
    isNot?: AuthProviderWhereInput
  }

  export type UserCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    authProviderId?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    authProviderId?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    authProviderId?: SortOrder
    passwordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    replacedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    replacedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    replacedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LoginAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    ipAddress?: SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    ipAddress?: SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    ipAddress?: SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthProviderCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<AuthProviderCreateWithoutAdminUserInput, AuthProviderUncheckedCreateWithoutAdminUserInput> | AuthProviderCreateWithoutAdminUserInput[] | AuthProviderUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutAdminUserInput | AuthProviderCreateOrConnectWithoutAdminUserInput[]
    createMany?: AuthProviderCreateManyAdminUserInputEnvelope
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<RefreshTokenCreateWithoutAdminUserInput, RefreshTokenUncheckedCreateWithoutAdminUserInput> | RefreshTokenCreateWithoutAdminUserInput[] | RefreshTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAdminUserInput | RefreshTokenCreateOrConnectWithoutAdminUserInput[]
    createMany?: RefreshTokenCreateManyAdminUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutAdminUserInput, PasswordResetTokenUncheckedCreateWithoutAdminUserInput> | PasswordResetTokenCreateWithoutAdminUserInput[] | PasswordResetTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutAdminUserInput | PasswordResetTokenCreateOrConnectWithoutAdminUserInput[]
    createMany?: PasswordResetTokenCreateManyAdminUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type BusinessMemberCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<BusinessMemberCreateWithoutAdminUserInput, BusinessMemberUncheckedCreateWithoutAdminUserInput> | BusinessMemberCreateWithoutAdminUserInput[] | BusinessMemberUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutAdminUserInput | BusinessMemberCreateOrConnectWithoutAdminUserInput[]
    createMany?: BusinessMemberCreateManyAdminUserInputEnvelope
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
  }

  export type AuthProviderUncheckedCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<AuthProviderCreateWithoutAdminUserInput, AuthProviderUncheckedCreateWithoutAdminUserInput> | AuthProviderCreateWithoutAdminUserInput[] | AuthProviderUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutAdminUserInput | AuthProviderCreateOrConnectWithoutAdminUserInput[]
    createMany?: AuthProviderCreateManyAdminUserInputEnvelope
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<RefreshTokenCreateWithoutAdminUserInput, RefreshTokenUncheckedCreateWithoutAdminUserInput> | RefreshTokenCreateWithoutAdminUserInput[] | RefreshTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAdminUserInput | RefreshTokenCreateOrConnectWithoutAdminUserInput[]
    createMany?: RefreshTokenCreateManyAdminUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutAdminUserInput, PasswordResetTokenUncheckedCreateWithoutAdminUserInput> | PasswordResetTokenCreateWithoutAdminUserInput[] | PasswordResetTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutAdminUserInput | PasswordResetTokenCreateOrConnectWithoutAdminUserInput[]
    createMany?: PasswordResetTokenCreateManyAdminUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type BusinessMemberUncheckedCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<BusinessMemberCreateWithoutAdminUserInput, BusinessMemberUncheckedCreateWithoutAdminUserInput> | BusinessMemberCreateWithoutAdminUserInput[] | BusinessMemberUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutAdminUserInput | BusinessMemberCreateOrConnectWithoutAdminUserInput[]
    createMany?: BusinessMemberCreateManyAdminUserInputEnvelope
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthProviderUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<AuthProviderCreateWithoutAdminUserInput, AuthProviderUncheckedCreateWithoutAdminUserInput> | AuthProviderCreateWithoutAdminUserInput[] | AuthProviderUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutAdminUserInput | AuthProviderCreateOrConnectWithoutAdminUserInput[]
    upsert?: AuthProviderUpsertWithWhereUniqueWithoutAdminUserInput | AuthProviderUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: AuthProviderCreateManyAdminUserInputEnvelope
    set?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    disconnect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    delete?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    update?: AuthProviderUpdateWithWhereUniqueWithoutAdminUserInput | AuthProviderUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: AuthProviderUpdateManyWithWhereWithoutAdminUserInput | AuthProviderUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutAdminUserInput, RefreshTokenUncheckedCreateWithoutAdminUserInput> | RefreshTokenCreateWithoutAdminUserInput[] | RefreshTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAdminUserInput | RefreshTokenCreateOrConnectWithoutAdminUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutAdminUserInput | RefreshTokenUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: RefreshTokenCreateManyAdminUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutAdminUserInput | RefreshTokenUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutAdminUserInput | RefreshTokenUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutAdminUserInput, PasswordResetTokenUncheckedCreateWithoutAdminUserInput> | PasswordResetTokenCreateWithoutAdminUserInput[] | PasswordResetTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutAdminUserInput | PasswordResetTokenCreateOrConnectWithoutAdminUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutAdminUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: PasswordResetTokenCreateManyAdminUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutAdminUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutAdminUserInput | PasswordResetTokenUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type BusinessMemberUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<BusinessMemberCreateWithoutAdminUserInput, BusinessMemberUncheckedCreateWithoutAdminUserInput> | BusinessMemberCreateWithoutAdminUserInput[] | BusinessMemberUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutAdminUserInput | BusinessMemberCreateOrConnectWithoutAdminUserInput[]
    upsert?: BusinessMemberUpsertWithWhereUniqueWithoutAdminUserInput | BusinessMemberUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: BusinessMemberCreateManyAdminUserInputEnvelope
    set?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    disconnect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    delete?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    update?: BusinessMemberUpdateWithWhereUniqueWithoutAdminUserInput | BusinessMemberUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: BusinessMemberUpdateManyWithWhereWithoutAdminUserInput | BusinessMemberUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: BusinessMemberScalarWhereInput | BusinessMemberScalarWhereInput[]
  }

  export type AuthProviderUncheckedUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<AuthProviderCreateWithoutAdminUserInput, AuthProviderUncheckedCreateWithoutAdminUserInput> | AuthProviderCreateWithoutAdminUserInput[] | AuthProviderUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutAdminUserInput | AuthProviderCreateOrConnectWithoutAdminUserInput[]
    upsert?: AuthProviderUpsertWithWhereUniqueWithoutAdminUserInput | AuthProviderUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: AuthProviderCreateManyAdminUserInputEnvelope
    set?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    disconnect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    delete?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    update?: AuthProviderUpdateWithWhereUniqueWithoutAdminUserInput | AuthProviderUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: AuthProviderUpdateManyWithWhereWithoutAdminUserInput | AuthProviderUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutAdminUserInput, RefreshTokenUncheckedCreateWithoutAdminUserInput> | RefreshTokenCreateWithoutAdminUserInput[] | RefreshTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAdminUserInput | RefreshTokenCreateOrConnectWithoutAdminUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutAdminUserInput | RefreshTokenUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: RefreshTokenCreateManyAdminUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutAdminUserInput | RefreshTokenUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutAdminUserInput | RefreshTokenUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutAdminUserInput, PasswordResetTokenUncheckedCreateWithoutAdminUserInput> | PasswordResetTokenCreateWithoutAdminUserInput[] | PasswordResetTokenUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutAdminUserInput | PasswordResetTokenCreateOrConnectWithoutAdminUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutAdminUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: PasswordResetTokenCreateManyAdminUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutAdminUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutAdminUserInput | PasswordResetTokenUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type BusinessMemberUncheckedUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<BusinessMemberCreateWithoutAdminUserInput, BusinessMemberUncheckedCreateWithoutAdminUserInput> | BusinessMemberCreateWithoutAdminUserInput[] | BusinessMemberUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutAdminUserInput | BusinessMemberCreateOrConnectWithoutAdminUserInput[]
    upsert?: BusinessMemberUpsertWithWhereUniqueWithoutAdminUserInput | BusinessMemberUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: BusinessMemberCreateManyAdminUserInputEnvelope
    set?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    disconnect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    delete?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    update?: BusinessMemberUpdateWithWhereUniqueWithoutAdminUserInput | BusinessMemberUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: BusinessMemberUpdateManyWithWhereWithoutAdminUserInput | BusinessMemberUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: BusinessMemberScalarWhereInput | BusinessMemberScalarWhereInput[]
  }

  export type BusinessMemberCreateNestedManyWithoutBusinessInput = {
    create?: XOR<BusinessMemberCreateWithoutBusinessInput, BusinessMemberUncheckedCreateWithoutBusinessInput> | BusinessMemberCreateWithoutBusinessInput[] | BusinessMemberUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutBusinessInput | BusinessMemberCreateOrConnectWithoutBusinessInput[]
    createMany?: BusinessMemberCreateManyBusinessInputEnvelope
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
  }

  export type ServiceCategoryCreateNestedManyWithoutBusinessInput = {
    create?: XOR<ServiceCategoryCreateWithoutBusinessInput, ServiceCategoryUncheckedCreateWithoutBusinessInput> | ServiceCategoryCreateWithoutBusinessInput[] | ServiceCategoryUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutBusinessInput | ServiceCategoryCreateOrConnectWithoutBusinessInput[]
    createMany?: ServiceCategoryCreateManyBusinessInputEnvelope
    connect?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutBusinessInput = {
    create?: XOR<ServiceCreateWithoutBusinessInput, ServiceUncheckedCreateWithoutBusinessInput> | ServiceCreateWithoutBusinessInput[] | ServiceUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBusinessInput | ServiceCreateOrConnectWithoutBusinessInput[]
    createMany?: ServiceCreateManyBusinessInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type EmployeeCreateNestedManyWithoutBusinessInput = {
    create?: XOR<EmployeeCreateWithoutBusinessInput, EmployeeUncheckedCreateWithoutBusinessInput> | EmployeeCreateWithoutBusinessInput[] | EmployeeUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBusinessInput | EmployeeCreateOrConnectWithoutBusinessInput[]
    createMany?: EmployeeCreateManyBusinessInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type BusinessMemberUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<BusinessMemberCreateWithoutBusinessInput, BusinessMemberUncheckedCreateWithoutBusinessInput> | BusinessMemberCreateWithoutBusinessInput[] | BusinessMemberUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutBusinessInput | BusinessMemberCreateOrConnectWithoutBusinessInput[]
    createMany?: BusinessMemberCreateManyBusinessInputEnvelope
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
  }

  export type ServiceCategoryUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<ServiceCategoryCreateWithoutBusinessInput, ServiceCategoryUncheckedCreateWithoutBusinessInput> | ServiceCategoryCreateWithoutBusinessInput[] | ServiceCategoryUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutBusinessInput | ServiceCategoryCreateOrConnectWithoutBusinessInput[]
    createMany?: ServiceCategoryCreateManyBusinessInputEnvelope
    connect?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<ServiceCreateWithoutBusinessInput, ServiceUncheckedCreateWithoutBusinessInput> | ServiceCreateWithoutBusinessInput[] | ServiceUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBusinessInput | ServiceCreateOrConnectWithoutBusinessInput[]
    createMany?: ServiceCreateManyBusinessInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<EmployeeCreateWithoutBusinessInput, EmployeeUncheckedCreateWithoutBusinessInput> | EmployeeCreateWithoutBusinessInput[] | EmployeeUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBusinessInput | EmployeeCreateOrConnectWithoutBusinessInput[]
    createMany?: EmployeeCreateManyBusinessInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BusinessMemberUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<BusinessMemberCreateWithoutBusinessInput, BusinessMemberUncheckedCreateWithoutBusinessInput> | BusinessMemberCreateWithoutBusinessInput[] | BusinessMemberUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutBusinessInput | BusinessMemberCreateOrConnectWithoutBusinessInput[]
    upsert?: BusinessMemberUpsertWithWhereUniqueWithoutBusinessInput | BusinessMemberUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: BusinessMemberCreateManyBusinessInputEnvelope
    set?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    disconnect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    delete?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    update?: BusinessMemberUpdateWithWhereUniqueWithoutBusinessInput | BusinessMemberUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: BusinessMemberUpdateManyWithWhereWithoutBusinessInput | BusinessMemberUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: BusinessMemberScalarWhereInput | BusinessMemberScalarWhereInput[]
  }

  export type ServiceCategoryUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<ServiceCategoryCreateWithoutBusinessInput, ServiceCategoryUncheckedCreateWithoutBusinessInput> | ServiceCategoryCreateWithoutBusinessInput[] | ServiceCategoryUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutBusinessInput | ServiceCategoryCreateOrConnectWithoutBusinessInput[]
    upsert?: ServiceCategoryUpsertWithWhereUniqueWithoutBusinessInput | ServiceCategoryUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: ServiceCategoryCreateManyBusinessInputEnvelope
    set?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    disconnect?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    delete?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    connect?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    update?: ServiceCategoryUpdateWithWhereUniqueWithoutBusinessInput | ServiceCategoryUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: ServiceCategoryUpdateManyWithWhereWithoutBusinessInput | ServiceCategoryUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: ServiceCategoryScalarWhereInput | ServiceCategoryScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<ServiceCreateWithoutBusinessInput, ServiceUncheckedCreateWithoutBusinessInput> | ServiceCreateWithoutBusinessInput[] | ServiceUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBusinessInput | ServiceCreateOrConnectWithoutBusinessInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutBusinessInput | ServiceUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: ServiceCreateManyBusinessInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutBusinessInput | ServiceUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutBusinessInput | ServiceUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type EmployeeUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<EmployeeCreateWithoutBusinessInput, EmployeeUncheckedCreateWithoutBusinessInput> | EmployeeCreateWithoutBusinessInput[] | EmployeeUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBusinessInput | EmployeeCreateOrConnectWithoutBusinessInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutBusinessInput | EmployeeUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: EmployeeCreateManyBusinessInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutBusinessInput | EmployeeUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutBusinessInput | EmployeeUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type BusinessMemberUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<BusinessMemberCreateWithoutBusinessInput, BusinessMemberUncheckedCreateWithoutBusinessInput> | BusinessMemberCreateWithoutBusinessInput[] | BusinessMemberUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessMemberCreateOrConnectWithoutBusinessInput | BusinessMemberCreateOrConnectWithoutBusinessInput[]
    upsert?: BusinessMemberUpsertWithWhereUniqueWithoutBusinessInput | BusinessMemberUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: BusinessMemberCreateManyBusinessInputEnvelope
    set?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    disconnect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    delete?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    connect?: BusinessMemberWhereUniqueInput | BusinessMemberWhereUniqueInput[]
    update?: BusinessMemberUpdateWithWhereUniqueWithoutBusinessInput | BusinessMemberUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: BusinessMemberUpdateManyWithWhereWithoutBusinessInput | BusinessMemberUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: BusinessMemberScalarWhereInput | BusinessMemberScalarWhereInput[]
  }

  export type ServiceCategoryUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<ServiceCategoryCreateWithoutBusinessInput, ServiceCategoryUncheckedCreateWithoutBusinessInput> | ServiceCategoryCreateWithoutBusinessInput[] | ServiceCategoryUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutBusinessInput | ServiceCategoryCreateOrConnectWithoutBusinessInput[]
    upsert?: ServiceCategoryUpsertWithWhereUniqueWithoutBusinessInput | ServiceCategoryUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: ServiceCategoryCreateManyBusinessInputEnvelope
    set?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    disconnect?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    delete?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    connect?: ServiceCategoryWhereUniqueInput | ServiceCategoryWhereUniqueInput[]
    update?: ServiceCategoryUpdateWithWhereUniqueWithoutBusinessInput | ServiceCategoryUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: ServiceCategoryUpdateManyWithWhereWithoutBusinessInput | ServiceCategoryUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: ServiceCategoryScalarWhereInput | ServiceCategoryScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<ServiceCreateWithoutBusinessInput, ServiceUncheckedCreateWithoutBusinessInput> | ServiceCreateWithoutBusinessInput[] | ServiceUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutBusinessInput | ServiceCreateOrConnectWithoutBusinessInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutBusinessInput | ServiceUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: ServiceCreateManyBusinessInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutBusinessInput | ServiceUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutBusinessInput | ServiceUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<EmployeeCreateWithoutBusinessInput, EmployeeUncheckedCreateWithoutBusinessInput> | EmployeeCreateWithoutBusinessInput[] | EmployeeUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutBusinessInput | EmployeeCreateOrConnectWithoutBusinessInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutBusinessInput | EmployeeUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: EmployeeCreateManyBusinessInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutBusinessInput | EmployeeUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutBusinessInput | EmployeeUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type AdminUserCreateNestedOneWithoutBusinessMembersInput = {
    create?: XOR<AdminUserCreateWithoutBusinessMembersInput, AdminUserUncheckedCreateWithoutBusinessMembersInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutBusinessMembersInput
    connect?: AdminUserWhereUniqueInput
  }

  export type BusinessCreateNestedOneWithoutBusinessMembersInput = {
    create?: XOR<BusinessCreateWithoutBusinessMembersInput, BusinessUncheckedCreateWithoutBusinessMembersInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutBusinessMembersInput
    connect?: BusinessWhereUniqueInput
  }

  export type EnumBusinessRoleFieldUpdateOperationsInput = {
    set?: $Enums.BusinessRole
  }

  export type AdminUserUpdateOneRequiredWithoutBusinessMembersNestedInput = {
    create?: XOR<AdminUserCreateWithoutBusinessMembersInput, AdminUserUncheckedCreateWithoutBusinessMembersInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutBusinessMembersInput
    upsert?: AdminUserUpsertWithoutBusinessMembersInput
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutBusinessMembersInput, AdminUserUpdateWithoutBusinessMembersInput>, AdminUserUncheckedUpdateWithoutBusinessMembersInput>
  }

  export type BusinessUpdateOneRequiredWithoutBusinessMembersNestedInput = {
    create?: XOR<BusinessCreateWithoutBusinessMembersInput, BusinessUncheckedCreateWithoutBusinessMembersInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutBusinessMembersInput
    upsert?: BusinessUpsertWithoutBusinessMembersInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutBusinessMembersInput, BusinessUpdateWithoutBusinessMembersInput>, BusinessUncheckedUpdateWithoutBusinessMembersInput>
  }

  export type BusinessCreateNestedOneWithoutServiceCategoriesInput = {
    create?: XOR<BusinessCreateWithoutServiceCategoriesInput, BusinessUncheckedCreateWithoutServiceCategoriesInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutServiceCategoriesInput
    connect?: BusinessWhereUniqueInput
  }

  export type ServiceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type BusinessUpdateOneRequiredWithoutServiceCategoriesNestedInput = {
    create?: XOR<BusinessCreateWithoutServiceCategoriesInput, BusinessUncheckedCreateWithoutServiceCategoriesInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutServiceCategoriesInput
    upsert?: BusinessUpsertWithoutServiceCategoriesInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutServiceCategoriesInput, BusinessUpdateWithoutServiceCategoriesInput>, BusinessUncheckedUpdateWithoutServiceCategoriesInput>
  }

  export type ServiceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type BusinessCreateNestedOneWithoutServicesInput = {
    create?: XOR<BusinessCreateWithoutServicesInput, BusinessUncheckedCreateWithoutServicesInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutServicesInput
    connect?: BusinessWhereUniqueInput
  }

  export type ServiceCategoryCreateNestedOneWithoutServicesInput = {
    create?: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutServicesInput
    connect?: ServiceCategoryWhereUniqueInput
  }

  export type EmployeeServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BusinessUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<BusinessCreateWithoutServicesInput, BusinessUncheckedCreateWithoutServicesInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutServicesInput
    upsert?: BusinessUpsertWithoutServicesInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutServicesInput, BusinessUpdateWithoutServicesInput>, BusinessUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceCategoryUpdateOneWithoutServicesNestedInput = {
    create?: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceCategoryCreateOrConnectWithoutServicesInput
    upsert?: ServiceCategoryUpsertWithoutServicesInput
    disconnect?: ServiceCategoryWhereInput | boolean
    delete?: ServiceCategoryWhereInput | boolean
    connect?: ServiceCategoryWhereUniqueInput
    update?: XOR<XOR<ServiceCategoryUpdateToOneWithWhereWithoutServicesInput, ServiceCategoryUpdateWithoutServicesInput>, ServiceCategoryUncheckedUpdateWithoutServicesInput>
  }

  export type EmployeeServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput | EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput | EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutServiceInput | EmployeeServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput> | EmployeeServiceCreateWithoutServiceInput[] | EmployeeServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutServiceInput | EmployeeServiceCreateOrConnectWithoutServiceInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput | EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: EmployeeServiceCreateManyServiceInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput | EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutServiceInput | EmployeeServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type BusinessCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<BusinessCreateWithoutEmployeesInput, BusinessUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutEmployeesInput
    connect?: BusinessWhereUniqueInput
  }

  export type EmployeeServiceCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
  }

  export type BusinessUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<BusinessCreateWithoutEmployeesInput, BusinessUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutEmployeesInput
    upsert?: BusinessUpsertWithoutEmployeesInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutEmployeesInput, BusinessUpdateWithoutEmployeesInput>, BusinessUncheckedUpdateWithoutEmployeesInput>
  }

  export type EmployeeServiceUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput | EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput> | EmployeeServiceCreateWithoutEmployeeInput[] | EmployeeServiceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeServiceCreateOrConnectWithoutEmployeeInput | EmployeeServiceCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeServiceCreateManyEmployeeInputEnvelope
    set?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    disconnect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    delete?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    connect?: EmployeeServiceWhereUniqueInput | EmployeeServiceWhereUniqueInput[]
    update?: EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput | EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutEmployeeServicesInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeServicesInput, EmployeeUncheckedCreateWithoutEmployeeServicesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeServicesInput
    connect?: EmployeeWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutEmployeeServicesInput = {
    create?: XOR<ServiceCreateWithoutEmployeeServicesInput, ServiceUncheckedCreateWithoutEmployeeServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEmployeeServicesInput
    connect?: ServiceWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutEmployeeServicesNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeServicesInput, EmployeeUncheckedCreateWithoutEmployeeServicesInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeServicesInput
    upsert?: EmployeeUpsertWithoutEmployeeServicesInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutEmployeeServicesInput, EmployeeUpdateWithoutEmployeeServicesInput>, EmployeeUncheckedUpdateWithoutEmployeeServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutEmployeeServicesNestedInput = {
    create?: XOR<ServiceCreateWithoutEmployeeServicesInput, ServiceUncheckedCreateWithoutEmployeeServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEmployeeServicesInput
    upsert?: ServiceUpsertWithoutEmployeeServicesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutEmployeeServicesInput, ServiceUpdateWithoutEmployeeServicesInput>, ServiceUncheckedUpdateWithoutEmployeeServicesInput>
  }

  export type AdminUserCreateNestedOneWithoutAuthProvidersInput = {
    create?: XOR<AdminUserCreateWithoutAuthProvidersInput, AdminUserUncheckedCreateWithoutAuthProvidersInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutAuthProvidersInput
    connect?: AdminUserWhereUniqueInput
  }

  export type UserCredentialCreateNestedOneWithoutAuthProviderInput = {
    create?: XOR<UserCredentialCreateWithoutAuthProviderInput, UserCredentialUncheckedCreateWithoutAuthProviderInput>
    connectOrCreate?: UserCredentialCreateOrConnectWithoutAuthProviderInput
    connect?: UserCredentialWhereUniqueInput
  }

  export type UserCredentialUncheckedCreateNestedOneWithoutAuthProviderInput = {
    create?: XOR<UserCredentialCreateWithoutAuthProviderInput, UserCredentialUncheckedCreateWithoutAuthProviderInput>
    connectOrCreate?: UserCredentialCreateOrConnectWithoutAuthProviderInput
    connect?: UserCredentialWhereUniqueInput
  }

  export type EnumAuthProviderTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuthProviderType
  }

  export type AdminUserUpdateOneRequiredWithoutAuthProvidersNestedInput = {
    create?: XOR<AdminUserCreateWithoutAuthProvidersInput, AdminUserUncheckedCreateWithoutAuthProvidersInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutAuthProvidersInput
    upsert?: AdminUserUpsertWithoutAuthProvidersInput
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutAuthProvidersInput, AdminUserUpdateWithoutAuthProvidersInput>, AdminUserUncheckedUpdateWithoutAuthProvidersInput>
  }

  export type UserCredentialUpdateOneWithoutAuthProviderNestedInput = {
    create?: XOR<UserCredentialCreateWithoutAuthProviderInput, UserCredentialUncheckedCreateWithoutAuthProviderInput>
    connectOrCreate?: UserCredentialCreateOrConnectWithoutAuthProviderInput
    upsert?: UserCredentialUpsertWithoutAuthProviderInput
    disconnect?: UserCredentialWhereInput | boolean
    delete?: UserCredentialWhereInput | boolean
    connect?: UserCredentialWhereUniqueInput
    update?: XOR<XOR<UserCredentialUpdateToOneWithWhereWithoutAuthProviderInput, UserCredentialUpdateWithoutAuthProviderInput>, UserCredentialUncheckedUpdateWithoutAuthProviderInput>
  }

  export type UserCredentialUncheckedUpdateOneWithoutAuthProviderNestedInput = {
    create?: XOR<UserCredentialCreateWithoutAuthProviderInput, UserCredentialUncheckedCreateWithoutAuthProviderInput>
    connectOrCreate?: UserCredentialCreateOrConnectWithoutAuthProviderInput
    upsert?: UserCredentialUpsertWithoutAuthProviderInput
    disconnect?: UserCredentialWhereInput | boolean
    delete?: UserCredentialWhereInput | boolean
    connect?: UserCredentialWhereUniqueInput
    update?: XOR<XOR<UserCredentialUpdateToOneWithWhereWithoutAuthProviderInput, UserCredentialUpdateWithoutAuthProviderInput>, UserCredentialUncheckedUpdateWithoutAuthProviderInput>
  }

  export type AuthProviderCreateNestedOneWithoutCredentialInput = {
    create?: XOR<AuthProviderCreateWithoutCredentialInput, AuthProviderUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutCredentialInput
    connect?: AuthProviderWhereUniqueInput
  }

  export type AuthProviderUpdateOneRequiredWithoutCredentialNestedInput = {
    create?: XOR<AuthProviderCreateWithoutCredentialInput, AuthProviderUncheckedCreateWithoutCredentialInput>
    connectOrCreate?: AuthProviderCreateOrConnectWithoutCredentialInput
    upsert?: AuthProviderUpsertWithoutCredentialInput
    connect?: AuthProviderWhereUniqueInput
    update?: XOR<XOR<AuthProviderUpdateToOneWithWhereWithoutCredentialInput, AuthProviderUpdateWithoutCredentialInput>, AuthProviderUncheckedUpdateWithoutCredentialInput>
  }

  export type AdminUserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<AdminUserCreateWithoutRefreshTokensInput, AdminUserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutRefreshTokensInput
    connect?: AdminUserWhereUniqueInput
  }

  export type AdminUserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<AdminUserCreateWithoutRefreshTokensInput, AdminUserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutRefreshTokensInput
    upsert?: AdminUserUpsertWithoutRefreshTokensInput
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutRefreshTokensInput, AdminUserUpdateWithoutRefreshTokensInput>, AdminUserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AdminUserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: XOR<AdminUserCreateWithoutPasswordResetTokensInput, AdminUserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutPasswordResetTokensInput
    connect?: AdminUserWhereUniqueInput
  }

  export type AdminUserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: XOR<AdminUserCreateWithoutPasswordResetTokensInput, AdminUserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutPasswordResetTokensInput
    upsert?: AdminUserUpsertWithoutPasswordResetTokensInput
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutPasswordResetTokensInput, AdminUserUpdateWithoutPasswordResetTokensInput>, AdminUserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumBusinessRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleFilter<$PrismaModel> | $Enums.BusinessRole
  }

  export type NestedEnumBusinessRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleWithAggregatesFilter<$PrismaModel> | $Enums.BusinessRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessRoleFilter<$PrismaModel>
    _max?: NestedEnumBusinessRoleFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumAuthProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProviderType | EnumAuthProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderTypeFilter<$PrismaModel> | $Enums.AuthProviderType
  }

  export type NestedEnumAuthProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProviderType | EnumAuthProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProviderType[] | ListEnumAuthProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuthProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AuthProviderCreateWithoutAdminUserInput = {
    id?: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
    credential?: UserCredentialCreateNestedOneWithoutAuthProviderInput
  }

  export type AuthProviderUncheckedCreateWithoutAdminUserInput = {
    id?: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
    credential?: UserCredentialUncheckedCreateNestedOneWithoutAuthProviderInput
  }

  export type AuthProviderCreateOrConnectWithoutAdminUserInput = {
    where: AuthProviderWhereUniqueInput
    create: XOR<AuthProviderCreateWithoutAdminUserInput, AuthProviderUncheckedCreateWithoutAdminUserInput>
  }

  export type AuthProviderCreateManyAdminUserInputEnvelope = {
    data: AuthProviderCreateManyAdminUserInput | AuthProviderCreateManyAdminUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutAdminUserInput = {
    id?: string
    tokenHash: string
    deviceInfo?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    replacedBy?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutAdminUserInput = {
    id?: string
    tokenHash: string
    deviceInfo?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    replacedBy?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutAdminUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutAdminUserInput, RefreshTokenUncheckedCreateWithoutAdminUserInput>
  }

  export type RefreshTokenCreateManyAdminUserInputEnvelope = {
    data: RefreshTokenCreateManyAdminUserInput | RefreshTokenCreateManyAdminUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenCreateWithoutAdminUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutAdminUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutAdminUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutAdminUserInput, PasswordResetTokenUncheckedCreateWithoutAdminUserInput>
  }

  export type PasswordResetTokenCreateManyAdminUserInputEnvelope = {
    data: PasswordResetTokenCreateManyAdminUserInput | PasswordResetTokenCreateManyAdminUserInput[]
    skipDuplicates?: boolean
  }

  export type BusinessMemberCreateWithoutAdminUserInput = {
    id?: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
    business: BusinessCreateNestedOneWithoutBusinessMembersInput
  }

  export type BusinessMemberUncheckedCreateWithoutAdminUserInput = {
    id?: string
    businessId: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
  }

  export type BusinessMemberCreateOrConnectWithoutAdminUserInput = {
    where: BusinessMemberWhereUniqueInput
    create: XOR<BusinessMemberCreateWithoutAdminUserInput, BusinessMemberUncheckedCreateWithoutAdminUserInput>
  }

  export type BusinessMemberCreateManyAdminUserInputEnvelope = {
    data: BusinessMemberCreateManyAdminUserInput | BusinessMemberCreateManyAdminUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthProviderUpsertWithWhereUniqueWithoutAdminUserInput = {
    where: AuthProviderWhereUniqueInput
    update: XOR<AuthProviderUpdateWithoutAdminUserInput, AuthProviderUncheckedUpdateWithoutAdminUserInput>
    create: XOR<AuthProviderCreateWithoutAdminUserInput, AuthProviderUncheckedCreateWithoutAdminUserInput>
  }

  export type AuthProviderUpdateWithWhereUniqueWithoutAdminUserInput = {
    where: AuthProviderWhereUniqueInput
    data: XOR<AuthProviderUpdateWithoutAdminUserInput, AuthProviderUncheckedUpdateWithoutAdminUserInput>
  }

  export type AuthProviderUpdateManyWithWhereWithoutAdminUserInput = {
    where: AuthProviderScalarWhereInput
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyWithoutAdminUserInput>
  }

  export type AuthProviderScalarWhereInput = {
    AND?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
    OR?: AuthProviderScalarWhereInput[]
    NOT?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
    id?: StringFilter<"AuthProvider"> | string
    adminUserId?: StringFilter<"AuthProvider"> | string
    type?: EnumAuthProviderTypeFilter<"AuthProvider"> | $Enums.AuthProviderType
    providerId?: StringNullableFilter<"AuthProvider"> | string | null
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutAdminUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutAdminUserInput, RefreshTokenUncheckedUpdateWithoutAdminUserInput>
    create: XOR<RefreshTokenCreateWithoutAdminUserInput, RefreshTokenUncheckedCreateWithoutAdminUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutAdminUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutAdminUserInput, RefreshTokenUncheckedUpdateWithoutAdminUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutAdminUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutAdminUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    adminUserId?: StringFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    replacedBy?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type PasswordResetTokenUpsertWithWhereUniqueWithoutAdminUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    update: XOR<PasswordResetTokenUpdateWithoutAdminUserInput, PasswordResetTokenUncheckedUpdateWithoutAdminUserInput>
    create: XOR<PasswordResetTokenCreateWithoutAdminUserInput, PasswordResetTokenUncheckedCreateWithoutAdminUserInput>
  }

  export type PasswordResetTokenUpdateWithWhereUniqueWithoutAdminUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    data: XOR<PasswordResetTokenUpdateWithoutAdminUserInput, PasswordResetTokenUncheckedUpdateWithoutAdminUserInput>
  }

  export type PasswordResetTokenUpdateManyWithWhereWithoutAdminUserInput = {
    where: PasswordResetTokenScalarWhereInput
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyWithoutAdminUserInput>
  }

  export type PasswordResetTokenScalarWhereInput = {
    AND?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    OR?: PasswordResetTokenScalarWhereInput[]
    NOT?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    adminUserId?: StringFilter<"PasswordResetToken"> | string
    tokenHash?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type BusinessMemberUpsertWithWhereUniqueWithoutAdminUserInput = {
    where: BusinessMemberWhereUniqueInput
    update: XOR<BusinessMemberUpdateWithoutAdminUserInput, BusinessMemberUncheckedUpdateWithoutAdminUserInput>
    create: XOR<BusinessMemberCreateWithoutAdminUserInput, BusinessMemberUncheckedCreateWithoutAdminUserInput>
  }

  export type BusinessMemberUpdateWithWhereUniqueWithoutAdminUserInput = {
    where: BusinessMemberWhereUniqueInput
    data: XOR<BusinessMemberUpdateWithoutAdminUserInput, BusinessMemberUncheckedUpdateWithoutAdminUserInput>
  }

  export type BusinessMemberUpdateManyWithWhereWithoutAdminUserInput = {
    where: BusinessMemberScalarWhereInput
    data: XOR<BusinessMemberUpdateManyMutationInput, BusinessMemberUncheckedUpdateManyWithoutAdminUserInput>
  }

  export type BusinessMemberScalarWhereInput = {
    AND?: BusinessMemberScalarWhereInput | BusinessMemberScalarWhereInput[]
    OR?: BusinessMemberScalarWhereInput[]
    NOT?: BusinessMemberScalarWhereInput | BusinessMemberScalarWhereInput[]
    id?: StringFilter<"BusinessMember"> | string
    adminUserId?: StringFilter<"BusinessMember"> | string
    businessId?: StringFilter<"BusinessMember"> | string
    role?: EnumBusinessRoleFilter<"BusinessMember"> | $Enums.BusinessRole
    createdAt?: DateTimeFilter<"BusinessMember"> | Date | string
  }

  export type BusinessMemberCreateWithoutBusinessInput = {
    id?: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutBusinessMembersInput
  }

  export type BusinessMemberUncheckedCreateWithoutBusinessInput = {
    id?: string
    adminUserId: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
  }

  export type BusinessMemberCreateOrConnectWithoutBusinessInput = {
    where: BusinessMemberWhereUniqueInput
    create: XOR<BusinessMemberCreateWithoutBusinessInput, BusinessMemberUncheckedCreateWithoutBusinessInput>
  }

  export type BusinessMemberCreateManyBusinessInputEnvelope = {
    data: BusinessMemberCreateManyBusinessInput | BusinessMemberCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCategoryCreateWithoutBusinessInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type ServiceCategoryUncheckedCreateWithoutBusinessInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ServiceCategoryCreateOrConnectWithoutBusinessInput = {
    where: ServiceCategoryWhereUniqueInput
    create: XOR<ServiceCategoryCreateWithoutBusinessInput, ServiceCategoryUncheckedCreateWithoutBusinessInput>
  }

  export type ServiceCategoryCreateManyBusinessInputEnvelope = {
    data: ServiceCategoryCreateManyBusinessInput | ServiceCategoryCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutBusinessInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
    employeeServices?: EmployeeServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutBusinessInput = {
    id?: string
    categoryId?: string | null
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeServices?: EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutBusinessInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBusinessInput, ServiceUncheckedCreateWithoutBusinessInput>
  }

  export type ServiceCreateManyBusinessInputEnvelope = {
    data: ServiceCreateManyBusinessInput | ServiceCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeCreateWithoutBusinessInput = {
    id?: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeServices?: EmployeeServiceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutBusinessInput = {
    id?: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeServices?: EmployeeServiceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutBusinessInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutBusinessInput, EmployeeUncheckedCreateWithoutBusinessInput>
  }

  export type EmployeeCreateManyBusinessInputEnvelope = {
    data: EmployeeCreateManyBusinessInput | EmployeeCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type BusinessMemberUpsertWithWhereUniqueWithoutBusinessInput = {
    where: BusinessMemberWhereUniqueInput
    update: XOR<BusinessMemberUpdateWithoutBusinessInput, BusinessMemberUncheckedUpdateWithoutBusinessInput>
    create: XOR<BusinessMemberCreateWithoutBusinessInput, BusinessMemberUncheckedCreateWithoutBusinessInput>
  }

  export type BusinessMemberUpdateWithWhereUniqueWithoutBusinessInput = {
    where: BusinessMemberWhereUniqueInput
    data: XOR<BusinessMemberUpdateWithoutBusinessInput, BusinessMemberUncheckedUpdateWithoutBusinessInput>
  }

  export type BusinessMemberUpdateManyWithWhereWithoutBusinessInput = {
    where: BusinessMemberScalarWhereInput
    data: XOR<BusinessMemberUpdateManyMutationInput, BusinessMemberUncheckedUpdateManyWithoutBusinessInput>
  }

  export type ServiceCategoryUpsertWithWhereUniqueWithoutBusinessInput = {
    where: ServiceCategoryWhereUniqueInput
    update: XOR<ServiceCategoryUpdateWithoutBusinessInput, ServiceCategoryUncheckedUpdateWithoutBusinessInput>
    create: XOR<ServiceCategoryCreateWithoutBusinessInput, ServiceCategoryUncheckedCreateWithoutBusinessInput>
  }

  export type ServiceCategoryUpdateWithWhereUniqueWithoutBusinessInput = {
    where: ServiceCategoryWhereUniqueInput
    data: XOR<ServiceCategoryUpdateWithoutBusinessInput, ServiceCategoryUncheckedUpdateWithoutBusinessInput>
  }

  export type ServiceCategoryUpdateManyWithWhereWithoutBusinessInput = {
    where: ServiceCategoryScalarWhereInput
    data: XOR<ServiceCategoryUpdateManyMutationInput, ServiceCategoryUncheckedUpdateManyWithoutBusinessInput>
  }

  export type ServiceCategoryScalarWhereInput = {
    AND?: ServiceCategoryScalarWhereInput | ServiceCategoryScalarWhereInput[]
    OR?: ServiceCategoryScalarWhereInput[]
    NOT?: ServiceCategoryScalarWhereInput | ServiceCategoryScalarWhereInput[]
    id?: StringFilter<"ServiceCategory"> | string
    businessId?: StringFilter<"ServiceCategory"> | string
    name?: StringFilter<"ServiceCategory"> | string
    createdAt?: DateTimeFilter<"ServiceCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceCategory"> | Date | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutBusinessInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutBusinessInput, ServiceUncheckedUpdateWithoutBusinessInput>
    create: XOR<ServiceCreateWithoutBusinessInput, ServiceUncheckedCreateWithoutBusinessInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutBusinessInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutBusinessInput, ServiceUncheckedUpdateWithoutBusinessInput>
  }

  export type ServiceUpdateManyWithWhereWithoutBusinessInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutBusinessInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    businessId?: StringFilter<"Service"> | string
    categoryId?: StringNullableFilter<"Service"> | string | null
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFilter<"Service"> | number
    breakAfterMinutes?: IntNullableFilter<"Service"> | number | null
    position?: IntFilter<"Service"> | number
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type EmployeeUpsertWithWhereUniqueWithoutBusinessInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutBusinessInput, EmployeeUncheckedUpdateWithoutBusinessInput>
    create: XOR<EmployeeCreateWithoutBusinessInput, EmployeeUncheckedCreateWithoutBusinessInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutBusinessInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutBusinessInput, EmployeeUncheckedUpdateWithoutBusinessInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutBusinessInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutBusinessInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: StringFilter<"Employee"> | string
    businessId?: StringFilter<"Employee"> | string
    name?: StringFilter<"Employee"> | string
    specialization?: StringNullableFilter<"Employee"> | string | null
    imagePath?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
  }

  export type AdminUserCreateWithoutBusinessMembersInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderCreateNestedManyWithoutAdminUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUncheckedCreateWithoutBusinessMembersInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutAdminUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserCreateOrConnectWithoutBusinessMembersInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutBusinessMembersInput, AdminUserUncheckedCreateWithoutBusinessMembersInput>
  }

  export type BusinessCreateWithoutBusinessMembersInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceCategories?: ServiceCategoryCreateNestedManyWithoutBusinessInput
    services?: ServiceCreateNestedManyWithoutBusinessInput
    employees?: EmployeeCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutBusinessMembersInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceCategories?: ServiceCategoryUncheckedCreateNestedManyWithoutBusinessInput
    services?: ServiceUncheckedCreateNestedManyWithoutBusinessInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutBusinessMembersInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutBusinessMembersInput, BusinessUncheckedCreateWithoutBusinessMembersInput>
  }

  export type AdminUserUpsertWithoutBusinessMembersInput = {
    update: XOR<AdminUserUpdateWithoutBusinessMembersInput, AdminUserUncheckedUpdateWithoutBusinessMembersInput>
    create: XOR<AdminUserCreateWithoutBusinessMembersInput, AdminUserUncheckedCreateWithoutBusinessMembersInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutBusinessMembersInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutBusinessMembersInput, AdminUserUncheckedUpdateWithoutBusinessMembersInput>
  }

  export type AdminUserUpdateWithoutBusinessMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUpdateManyWithoutAdminUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserUncheckedUpdateWithoutBusinessMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUncheckedUpdateManyWithoutAdminUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutAdminUserNestedInput
  }

  export type BusinessUpsertWithoutBusinessMembersInput = {
    update: XOR<BusinessUpdateWithoutBusinessMembersInput, BusinessUncheckedUpdateWithoutBusinessMembersInput>
    create: XOR<BusinessCreateWithoutBusinessMembersInput, BusinessUncheckedCreateWithoutBusinessMembersInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutBusinessMembersInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutBusinessMembersInput, BusinessUncheckedUpdateWithoutBusinessMembersInput>
  }

  export type BusinessUpdateWithoutBusinessMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceCategories?: ServiceCategoryUpdateManyWithoutBusinessNestedInput
    services?: ServiceUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutBusinessMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceCategories?: ServiceCategoryUncheckedUpdateManyWithoutBusinessNestedInput
    services?: ServiceUncheckedUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessCreateWithoutServiceCategoriesInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberCreateNestedManyWithoutBusinessInput
    services?: ServiceCreateNestedManyWithoutBusinessInput
    employees?: EmployeeCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutServiceCategoriesInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutBusinessInput
    services?: ServiceUncheckedCreateNestedManyWithoutBusinessInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutServiceCategoriesInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutServiceCategoriesInput, BusinessUncheckedCreateWithoutServiceCategoriesInput>
  }

  export type ServiceCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutServicesInput
    employeeServices?: EmployeeServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCategoryInput = {
    id?: string
    businessId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeServices?: EmployeeServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceCreateManyCategoryInputEnvelope = {
    data: ServiceCreateManyCategoryInput | ServiceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUpsertWithoutServiceCategoriesInput = {
    update: XOR<BusinessUpdateWithoutServiceCategoriesInput, BusinessUncheckedUpdateWithoutServiceCategoriesInput>
    create: XOR<BusinessCreateWithoutServiceCategoriesInput, BusinessUncheckedCreateWithoutServiceCategoriesInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutServiceCategoriesInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutServiceCategoriesInput, BusinessUncheckedUpdateWithoutServiceCategoriesInput>
  }

  export type BusinessUpdateWithoutServiceCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUpdateManyWithoutBusinessNestedInput
    services?: ServiceUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutServiceCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutBusinessNestedInput
    services?: ServiceUncheckedUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type ServiceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type BusinessCreateWithoutServicesInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberCreateNestedManyWithoutBusinessInput
    serviceCategories?: ServiceCategoryCreateNestedManyWithoutBusinessInput
    employees?: EmployeeCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutServicesInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutBusinessInput
    serviceCategories?: ServiceCategoryUncheckedCreateNestedManyWithoutBusinessInput
    employees?: EmployeeUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutServicesInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutServicesInput, BusinessUncheckedCreateWithoutServicesInput>
  }

  export type ServiceCategoryCreateWithoutServicesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutServiceCategoriesInput
  }

  export type ServiceCategoryUncheckedCreateWithoutServicesInput = {
    id?: string
    businessId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCategoryCreateOrConnectWithoutServicesInput = {
    where: ServiceCategoryWhereUniqueInput
    create: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
  }

  export type EmployeeServiceCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutEmployeeServicesInput
  }

  export type EmployeeServiceUncheckedCreateWithoutServiceInput = {
    id?: string
    employeeId: string
    createdAt?: Date | string
  }

  export type EmployeeServiceCreateOrConnectWithoutServiceInput = {
    where: EmployeeServiceWhereUniqueInput
    create: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput>
  }

  export type EmployeeServiceCreateManyServiceInputEnvelope = {
    data: EmployeeServiceCreateManyServiceInput | EmployeeServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUpsertWithoutServicesInput = {
    update: XOR<BusinessUpdateWithoutServicesInput, BusinessUncheckedUpdateWithoutServicesInput>
    create: XOR<BusinessCreateWithoutServicesInput, BusinessUncheckedCreateWithoutServicesInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutServicesInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutServicesInput, BusinessUncheckedUpdateWithoutServicesInput>
  }

  export type BusinessUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUpdateManyWithoutBusinessNestedInput
    serviceCategories?: ServiceCategoryUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutBusinessNestedInput
    serviceCategories?: ServiceCategoryUncheckedUpdateManyWithoutBusinessNestedInput
    employees?: EmployeeUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type ServiceCategoryUpsertWithoutServicesInput = {
    update: XOR<ServiceCategoryUpdateWithoutServicesInput, ServiceCategoryUncheckedUpdateWithoutServicesInput>
    create: XOR<ServiceCategoryCreateWithoutServicesInput, ServiceCategoryUncheckedCreateWithoutServicesInput>
    where?: ServiceCategoryWhereInput
  }

  export type ServiceCategoryUpdateToOneWithWhereWithoutServicesInput = {
    where?: ServiceCategoryWhereInput
    data: XOR<ServiceCategoryUpdateWithoutServicesInput, ServiceCategoryUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceCategoryUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutServiceCategoriesNestedInput
  }

  export type ServiceCategoryUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: EmployeeServiceWhereUniqueInput
    update: XOR<EmployeeServiceUpdateWithoutServiceInput, EmployeeServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<EmployeeServiceCreateWithoutServiceInput, EmployeeServiceUncheckedCreateWithoutServiceInput>
  }

  export type EmployeeServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: EmployeeServiceWhereUniqueInput
    data: XOR<EmployeeServiceUpdateWithoutServiceInput, EmployeeServiceUncheckedUpdateWithoutServiceInput>
  }

  export type EmployeeServiceUpdateManyWithWhereWithoutServiceInput = {
    where: EmployeeServiceScalarWhereInput
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type EmployeeServiceScalarWhereInput = {
    AND?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
    OR?: EmployeeServiceScalarWhereInput[]
    NOT?: EmployeeServiceScalarWhereInput | EmployeeServiceScalarWhereInput[]
    id?: StringFilter<"EmployeeService"> | string
    employeeId?: StringFilter<"EmployeeService"> | string
    serviceId?: StringFilter<"EmployeeService"> | string
    createdAt?: DateTimeFilter<"EmployeeService"> | Date | string
  }

  export type BusinessCreateWithoutEmployeesInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberCreateNestedManyWithoutBusinessInput
    serviceCategories?: ServiceCategoryCreateNestedManyWithoutBusinessInput
    services?: ServiceCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name?: string | null
    description?: string | null
    logoPath?: string | null
    imagePath?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    telegram?: string | null
    vk?: string | null
    youtube?: string | null
    address?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutBusinessInput
    serviceCategories?: ServiceCategoryUncheckedCreateNestedManyWithoutBusinessInput
    services?: ServiceUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessCreateOrConnectWithoutEmployeesInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutEmployeesInput, BusinessUncheckedCreateWithoutEmployeesInput>
  }

  export type EmployeeServiceCreateWithoutEmployeeInput = {
    id?: string
    createdAt?: Date | string
    service: ServiceCreateNestedOneWithoutEmployeeServicesInput
  }

  export type EmployeeServiceUncheckedCreateWithoutEmployeeInput = {
    id?: string
    serviceId: string
    createdAt?: Date | string
  }

  export type EmployeeServiceCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeServiceWhereUniqueInput
    create: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeServiceCreateManyEmployeeInputEnvelope = {
    data: EmployeeServiceCreateManyEmployeeInput | EmployeeServiceCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUpsertWithoutEmployeesInput = {
    update: XOR<BusinessUpdateWithoutEmployeesInput, BusinessUncheckedUpdateWithoutEmployeesInput>
    create: XOR<BusinessCreateWithoutEmployeesInput, BusinessUncheckedCreateWithoutEmployeesInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutEmployeesInput, BusinessUncheckedUpdateWithoutEmployeesInput>
  }

  export type BusinessUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUpdateManyWithoutBusinessNestedInput
    serviceCategories?: ServiceCategoryUpdateManyWithoutBusinessNestedInput
    services?: ServiceUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    vk?: NullableStringFieldUpdateOperationsInput | string | null
    youtube?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutBusinessNestedInput
    serviceCategories?: ServiceCategoryUncheckedUpdateManyWithoutBusinessNestedInput
    services?: ServiceUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type EmployeeServiceUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeServiceWhereUniqueInput
    update: XOR<EmployeeServiceUpdateWithoutEmployeeInput, EmployeeServiceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeServiceCreateWithoutEmployeeInput, EmployeeServiceUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeServiceUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeServiceWhereUniqueInput
    data: XOR<EmployeeServiceUpdateWithoutEmployeeInput, EmployeeServiceUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeServiceUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeServiceScalarWhereInput
    data: XOR<EmployeeServiceUpdateManyMutationInput, EmployeeServiceUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmployeeCreateWithoutEmployeeServicesInput = {
    id?: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutEmployeesInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeServicesInput = {
    id?: string
    businessId: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateOrConnectWithoutEmployeeServicesInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeServicesInput, EmployeeUncheckedCreateWithoutEmployeeServicesInput>
  }

  export type ServiceCreateWithoutEmployeeServicesInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    business: BusinessCreateNestedOneWithoutServicesInput
    category?: ServiceCategoryCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutEmployeeServicesInput = {
    id?: string
    businessId: string
    categoryId?: string | null
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutEmployeeServicesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutEmployeeServicesInput, ServiceUncheckedCreateWithoutEmployeeServicesInput>
  }

  export type EmployeeUpsertWithoutEmployeeServicesInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeServicesInput, EmployeeUncheckedUpdateWithoutEmployeeServicesInput>
    create: XOR<EmployeeCreateWithoutEmployeeServicesInput, EmployeeUncheckedCreateWithoutEmployeeServicesInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutEmployeeServicesInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutEmployeeServicesInput, EmployeeUncheckedUpdateWithoutEmployeeServicesInput>
  }

  export type EmployeeUpdateWithoutEmployeeServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpsertWithoutEmployeeServicesInput = {
    update: XOR<ServiceUpdateWithoutEmployeeServicesInput, ServiceUncheckedUpdateWithoutEmployeeServicesInput>
    create: XOR<ServiceCreateWithoutEmployeeServicesInput, ServiceUncheckedCreateWithoutEmployeeServicesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutEmployeeServicesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutEmployeeServicesInput, ServiceUncheckedUpdateWithoutEmployeeServicesInput>
  }

  export type ServiceUpdateWithoutEmployeeServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutServicesNestedInput
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutEmployeeServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateWithoutAuthProvidersInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUncheckedCreateWithoutAuthProvidersInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserCreateOrConnectWithoutAuthProvidersInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutAuthProvidersInput, AdminUserUncheckedCreateWithoutAuthProvidersInput>
  }

  export type UserCredentialCreateWithoutAuthProviderInput = {
    id?: string
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserCredentialUncheckedCreateWithoutAuthProviderInput = {
    id?: string
    passwordHash: string
    updatedAt?: Date | string
  }

  export type UserCredentialCreateOrConnectWithoutAuthProviderInput = {
    where: UserCredentialWhereUniqueInput
    create: XOR<UserCredentialCreateWithoutAuthProviderInput, UserCredentialUncheckedCreateWithoutAuthProviderInput>
  }

  export type AdminUserUpsertWithoutAuthProvidersInput = {
    update: XOR<AdminUserUpdateWithoutAuthProvidersInput, AdminUserUncheckedUpdateWithoutAuthProvidersInput>
    create: XOR<AdminUserCreateWithoutAuthProvidersInput, AdminUserUncheckedCreateWithoutAuthProvidersInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutAuthProvidersInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutAuthProvidersInput, AdminUserUncheckedUpdateWithoutAuthProvidersInput>
  }

  export type AdminUserUpdateWithoutAuthProvidersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserUncheckedUpdateWithoutAuthProvidersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutAdminUserNestedInput
  }

  export type UserCredentialUpsertWithoutAuthProviderInput = {
    update: XOR<UserCredentialUpdateWithoutAuthProviderInput, UserCredentialUncheckedUpdateWithoutAuthProviderInput>
    create: XOR<UserCredentialCreateWithoutAuthProviderInput, UserCredentialUncheckedCreateWithoutAuthProviderInput>
    where?: UserCredentialWhereInput
  }

  export type UserCredentialUpdateToOneWithWhereWithoutAuthProviderInput = {
    where?: UserCredentialWhereInput
    data: XOR<UserCredentialUpdateWithoutAuthProviderInput, UserCredentialUncheckedUpdateWithoutAuthProviderInput>
  }

  export type UserCredentialUpdateWithoutAuthProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCredentialUncheckedUpdateWithoutAuthProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateWithoutCredentialInput = {
    id?: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutAuthProvidersInput
  }

  export type AuthProviderUncheckedCreateWithoutCredentialInput = {
    id?: string
    adminUserId: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
  }

  export type AuthProviderCreateOrConnectWithoutCredentialInput = {
    where: AuthProviderWhereUniqueInput
    create: XOR<AuthProviderCreateWithoutCredentialInput, AuthProviderUncheckedCreateWithoutCredentialInput>
  }

  export type AuthProviderUpsertWithoutCredentialInput = {
    update: XOR<AuthProviderUpdateWithoutCredentialInput, AuthProviderUncheckedUpdateWithoutCredentialInput>
    create: XOR<AuthProviderCreateWithoutCredentialInput, AuthProviderUncheckedCreateWithoutCredentialInput>
    where?: AuthProviderWhereInput
  }

  export type AuthProviderUpdateToOneWithWhereWithoutCredentialInput = {
    where?: AuthProviderWhereInput
    data: XOR<AuthProviderUpdateWithoutCredentialInput, AuthProviderUncheckedUpdateWithoutCredentialInput>
  }

  export type AuthProviderUpdateWithoutCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutAuthProvidersNestedInput
  }

  export type AuthProviderUncheckedUpdateWithoutCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateWithoutRefreshTokensInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutAdminUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserCreateOrConnectWithoutRefreshTokensInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutRefreshTokensInput, AdminUserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type AdminUserUpsertWithoutRefreshTokensInput = {
    update: XOR<AdminUserUpdateWithoutRefreshTokensInput, AdminUserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<AdminUserCreateWithoutRefreshTokensInput, AdminUserUncheckedCreateWithoutRefreshTokensInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutRefreshTokensInput, AdminUserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type AdminUserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUncheckedUpdateManyWithoutAdminUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserCreateWithoutPasswordResetTokensInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderCreateNestedManyWithoutAdminUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: string
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutAdminUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutAdminUserInput
    businessMembers?: BusinessMemberUncheckedCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutPasswordResetTokensInput, AdminUserUncheckedCreateWithoutPasswordResetTokensInput>
  }

  export type AdminUserUpsertWithoutPasswordResetTokensInput = {
    update: XOR<AdminUserUpdateWithoutPasswordResetTokensInput, AdminUserUncheckedUpdateWithoutPasswordResetTokensInput>
    create: XOR<AdminUserCreateWithoutPasswordResetTokensInput, AdminUserUncheckedCreateWithoutPasswordResetTokensInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutPasswordResetTokensInput, AdminUserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type AdminUserUpdateWithoutPasswordResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUpdateManyWithoutAdminUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserUncheckedUpdateWithoutPasswordResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authProviders?: AuthProviderUncheckedUpdateManyWithoutAdminUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutAdminUserNestedInput
    businessMembers?: BusinessMemberUncheckedUpdateManyWithoutAdminUserNestedInput
  }

  export type AuthProviderCreateManyAdminUserInput = {
    id?: string
    type: $Enums.AuthProviderType
    providerId?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateManyAdminUserInput = {
    id?: string
    tokenHash: string
    deviceInfo?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    replacedBy?: string | null
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateManyAdminUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type BusinessMemberCreateManyAdminUserInput = {
    id?: string
    businessId: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
  }

  export type AuthProviderUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credential?: UserCredentialUpdateOneWithoutAuthProviderNestedInput
  }

  export type AuthProviderUncheckedUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credential?: UserCredentialUncheckedUpdateOneWithoutAuthProviderNestedInput
  }

  export type AuthProviderUncheckedUpdateManyWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAuthProviderTypeFieldUpdateOperationsInput | $Enums.AuthProviderType
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    replacedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutBusinessMembersNestedInput
  }

  export type BusinessMemberUncheckedUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberUncheckedUpdateManyWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberCreateManyBusinessInput = {
    id?: string
    adminUserId: string
    role?: $Enums.BusinessRole
    createdAt?: Date | string
  }

  export type ServiceCategoryCreateManyBusinessInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateManyBusinessInput = {
    id?: string
    categoryId?: string | null
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeCreateManyBusinessInput = {
    id?: string
    name: string
    specialization?: string | null
    imagePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessMemberUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutBusinessMembersNestedInput
  }

  export type BusinessMemberUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessMemberUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCategoryUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type ServiceCategoryUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ServiceCategoryUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ServiceCategoryUpdateOneWithoutServicesNestedInput
    employeeServices?: EmployeeServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeServices?: EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeServices?: EmployeeServiceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeServices?: EmployeeServiceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    imagePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateManyCategoryInput = {
    id?: string
    businessId: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    durationMinutes: number
    breakAfterMinutes?: number | null
    position?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutServicesNestedInput
    employeeServices?: EmployeeServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeServices?: EmployeeServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    breakAfterMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    position?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceCreateManyServiceInput = {
    id?: string
    employeeId: string
    createdAt?: Date | string
  }

  export type EmployeeServiceUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutEmployeeServicesNestedInput
  }

  export type EmployeeServiceUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceCreateManyEmployeeInput = {
    id?: string
    serviceId: string
    createdAt?: Date | string
  }

  export type EmployeeServiceUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutEmployeeServicesNestedInput
  }

  export type EmployeeServiceUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeServiceUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}