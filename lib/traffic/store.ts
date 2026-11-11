import { storageNamespace } from "@/lib/storage/namespace";
import { updateJson, readJson } from "@/lib/storage/json-store";
import { applyBatch, dayKey, emptyDay, mergeDay, SHARDS, type Batch, type DayTotals } from "./model";

/**
 * One JSON document per UTC day per shard: `<ns>analytics/<day>/<n>.json`.
 *
 * Shards exist because every write names the version it read and is refused if
 * someone wrote first. One document per day would turn two visitors leaving at
 * the same moment into a retry; three means they usually do not collide, and
 * the dashboard adds the three back together.
 *
 * Totals, not events: a day's document grows with the number of distinct pages
 * and platforms, never with the number of visitors, and holds nothing that
 * identifies one.
 */

const pathFor = (day: string, shard: number, ns = storageNamespace()) => `${ns}analytics/${day}/${shard}.json`;

export async function recordBatch(batch: Batch, now: Date = new Date()): Promise<void> {
  const day = dayKey(now);
  const shard = Math.floor(Math.random() * SHARDS);
  await updateJson<DayTotals>(
    pathFor(day, shard),
    () => emptyDay(day),
    (current) => applyBatch(current, batch),
  );
}

/** Totals for the given days, in the order given. A day with no document is an empty day. */
export async function readDays(days: string[]): Promise<DayTotals[]> {
  return Promise.all(
    days.map(async (day) => {
      const parts = await Promise.all(
        Array.from({ length: SHARDS }, async (_, shard) => {
          const doc = await readJson<DayTotals>(pathFor(day, shard)).catch(() => null);
          return doc?.data ?? emptyDay(day);
        }),
      );
      return mergeDay(day, parts);
    }),
  );
}
