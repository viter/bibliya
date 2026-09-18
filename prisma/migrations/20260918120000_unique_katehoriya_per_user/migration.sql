-- Merge duplicate categories (same user, same name) into the one with the lowest id,
-- keeping every quote attached to it.
INSERT IGNORE INTO `_katehoriyiTotsytaty` (`A`, `B`)
SELECT keep.`id`, j.`B`
FROM `katehoriyi` dup
JOIN `katehoriyi` keep
  ON keep.`userid` = dup.`userid`
 AND keep.`katehoriya` = dup.`katehoriya`
 AND keep.`id` < dup.`id`
JOIN `_katehoriyiTotsytaty` j ON j.`A` = dup.`id`
WHERE keep.`id` = (
  SELECT MIN(k.`id`) FROM `katehoriyi` k
  WHERE k.`userid` = dup.`userid` AND k.`katehoriya` = dup.`katehoriya`
);

DELETE dup FROM `katehoriyi` dup
JOIN `katehoriyi` keep
  ON keep.`userid` = dup.`userid`
 AND keep.`katehoriya` = dup.`katehoriya`
 AND keep.`id` < dup.`id`;

-- CreateIndex
CREATE UNIQUE INDEX `katehoriyi_userid_katehoriya_key` ON `katehoriyi`(`userid`, `katehoriya`);
