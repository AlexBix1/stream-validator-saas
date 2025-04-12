import { createClient } from '@supabase/supabase-js'

// Connect to supabase: Note, need to pass in REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY when starting application
export const connectToSupabase = async (url) => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

    const supabase = await createClient(supabaseUrl, supabaseKey);
    return supabase;
};

// Method to get streams from supabase connection
export const getStreams = async (supabase) => {
    let { data: streams } = await supabase
        .from('streams')
        .select("*");
    return streams;
}

// TODO - Get stream by id
export const getStreamById = async (supabase, id) => {
    let { data: streams } = await supabase
    .from('streams')
    .select("*")
    .eq('id', id)
    return streams; 
}

// Method to add stream
export const addStream = async (supabase, streamData) => {
    // TODO - This should be a UUID or something
    const randomNum = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
    await supabase.from('streams').insert([
        {
          id: randomNum,
          created_at: new Date(),
          name: streamData?.name,
          url: streamData?.url,
          is_enabled: true,
          is_playing: false,
          last_playback: null,
         // tag: 'default',
        },
    ]);

    // Refetch of new record
    const data = await getStreamById(supabase, randomNum);
    return data[0];
}