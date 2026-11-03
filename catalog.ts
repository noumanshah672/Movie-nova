export type Title = {
  id: number; title: string; year: number; kind: 'Movie'|'Series'|'Anime';
  language: string; genre: string; region: string; description: string;
  poster?: string; status: 'Released'|'Upcoming'; source?: string;
}
export const catalog: Title[] = [
 {id:1,title:'The Legend of Maula Jatt',year:2022,kind:'Movie',language:'Punjabi',genre:'Action / Drama',region:'Pakistan',description:'A fierce rivalry shapes this Punjabi action drama.',status:'Released'},
 {id:2,title:'Carry On Jatta 3',year:2023,kind:'Movie',language:'Punjabi',genre:'Comedy',region:'India',description:'A comedy of mistaken identities and family chaos.',status:'Released'},
 {id:3,title:'Squid Game',year:2021,kind:'Series',language:'Korean',genre:'Thriller',region:'South Korea',description:'A tense survival drama built around mysterious games.',status:'Released'},
 {id:4,title:'The Crown',year:2016,kind:'Series',language:'English',genre:'Historical Drama',region:'United Kingdom',description:'A dramatized story of the British royal family.',status:'Released'},
 {id:5,title:'Demon Slayer',year:2019,kind:'Anime',language:'Japanese',genre:'Adventure / Fantasy',region:'Japan',description:'An animated fantasy adventure about courage and family.',status:'Released'},
 {id:6,title:'Our Planet',year:2019,kind:'Series',language:'English',genre:'Documentary',region:'United Kingdom',description:'A nature documentary exploring ecosystems around the world.',status:'Released'},
 {id:7,title:'Maujaan Hi Maujaan',year:2023,kind:'Movie',language:'Punjabi',genre:'Comedy',region:'India',description:'A family comedy about friendship and relationships.',status:'Released'},
 {id:8,title:'The Last of Us',year:2023,kind:'Series',language:'English',genre:'Drama / Adventure',region:'United States',description:'Two survivors travel through a changed world.',status:'Released'}
]
