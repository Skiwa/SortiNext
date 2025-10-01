import React from "react";
import { AlbumWithTracksDto } from "@/app/api/dto/AlbumWithTracksDto";
import { AlbumDetails } from "../organisms/AlbumDetails";
import { TrackList } from "../organisms/TrackList";

interface AlbumPageTemplateProps {
  album: AlbumWithTracksDto;
}

export function AlbumPageTemplate({ album }: AlbumPageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <AlbumDetails album={album} />
        <div className="mt-8">
          <TrackList tracks={album.tracks} />
        </div>
      </div>
    </div>
  );
}
