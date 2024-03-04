const localStotageKeys = ['point', 'pointId'] as const;

export const localStorageKeyHashSet = Object.fromEntries(
  localStotageKeys.map((k) => [k, k])
) as { [k in (typeof localStotageKeys)[number]]: k };

// 重複チェック
const set = new Set(localStotageKeys);
if (set.size !== localStotageKeys.length) {
  throw Error('LocalStorageKeyが重複しています');
}
