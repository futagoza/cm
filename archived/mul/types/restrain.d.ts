/*

type TransformerOptions = {

    required: boolean;
    skipable: boolean;

};

type VaildOption<K, V> = Restrain<TransformerOptions, K, V, false | undefined>;

type RequireTransformer  = VaildOption<"required", true>;
type SkipableTransformer = VaildOption<"skipable", true>;
type SkipableValue       = VaildOption<"skipable", false>;

*/

export type Restrain<Interface, Fields, NewType, DefaultType = null> = {

    // Iterate over and re-map each field
    [ $ in keyof Interface ]:

        // If $ is (or in) Fields then re-map to NewType
        $ extends Fields ? NewType

        // If there's no DefaultType (or it's just null), use orignal type
        : DefaultType extends null ? Interface[ $ ]

        // Use DefaultType (non-`null` types only)
        : DefaultType;

};
