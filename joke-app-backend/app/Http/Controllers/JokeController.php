<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Joke;

class JokeController extends Controller
{
    public function getJoke(Request $request)
    {
        $seenJokes = json_decode($request->cookie('seen_jokes', '[]'));
    
        if (!empty($seenJokes)) {
            $joke = Joke::whereNotIn('id', $seenJokes)->inRandomOrder()->first();
        } else {
            $joke = Joke::inRandomOrder()->first();
        }

        if ($joke) {
            return response()->json($joke);
        } else {
            return response()->json(['message' => "That's all the jokes for today! Come back another day!"], 200);
        }
    }

    public function voteJoke(Request $request, $id)
    {
        $request->validate([
            'vote' => 'required|in:like,dislike',
        ]);

        $joke = Joke::findOrFail($id);
        
        if ($request->vote == 'like') {
            $joke->likes += 1;
        } else {
            $joke->dislikes += 1;
        }
        
        $joke->save();

        $seenJokes = json_decode($request->cookie('seen_jokes', '[]'), true);

        if (!in_array($joke->id, $seenJokes)) {
            $seenJokes[] = $joke->id;
        }

        return response()->json($joke)->cookie('seen_jokes', json_encode($seenJokes), 60*24*30, '/', '', false, true);    
    }

}
