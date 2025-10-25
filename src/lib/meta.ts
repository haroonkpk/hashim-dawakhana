import Meta from "@/models/meta.model";

export const touchMeta = async (key: string): Promise<void> => {
  await Meta.findOneAndUpdate(
    { key },
    { updatedAt: new Date() },
    { upsert: true }
  );
};
