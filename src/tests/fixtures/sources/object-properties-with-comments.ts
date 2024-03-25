/*
 * Source file for testing that the program removes any comments from types.
 */

/**
 * A descriptor for a SplitView instance.
 */
interface ISplitViewDescriptor {
  /**
   * The layout size.
   */
  readonly size: number;

  /**
   * Descriptors.
   */
  readonly views: {
    /**
     * Whether the view is visible.
     *
     * @defaultValue `true`
     */
    readonly visible?: boolean;

    /**
     * The size of the view.
     *
     * @defaultValue `true`
     */
    readonly size: number;
  }[];
}
