"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Icon } from "@/components/shared/Icon";

export default function FeaturesCollaborationTrailing() {
  return (
    <div className="relative z-[1] flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-900 sm:text-sm"
      >
        <Icon
          name="UserPlus01"
          size={16}
          strokeWidth={2}
          className="text-neutral-900"
        />
        Invite
      </button>
      <AvatarGroup
        aria-hidden
        className="*:data-[slot=avatar]:ring-0 *:data-[slot=avatar]:after:border-0"
      >
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-blue-900 text-xs text-white">
            A
          </AvatarFallback>
        </Avatar>
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-sky-400 text-xs text-white">
            R
          </AvatarFallback>
        </Avatar>
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-red-500 text-xs text-white">
            L
          </AvatarFallback>
        </Avatar>
        <AvatarGroupCount className="h-7 w-7 bg-neutral-700 text-xs text-white ring-0">
          +2
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
