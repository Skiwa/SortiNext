import React from "react";
import { AlbumWithTracksDto } from "@/app/api/dto/AlbumWithTracksDto";
import { AlbumDetails } from "../organisms/AlbumDetails";

interface AlbumPageTemplateProps {
  album: AlbumWithTracksDto;
}

export function AlbumPageTemplate({ album }: AlbumPageTemplateProps) {
  return (
    <div className="min-h-screen">
      <AlbumDetails album={album} />
    </div>
  );
}
