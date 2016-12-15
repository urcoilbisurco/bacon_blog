@extends('layout')

@section('content')
  <div class="page-header clearfix">
      <h3>
          Posts
      </h3>
  </div>
  <div class="posts">
    <div class="empty-posts">
      <img src="/images/empty-bacon.png">
      <p>No posts yet...</p>
    </div>
  </div>

@endsection

@section("scripts")
<script>
  app.init();
</script>
@endsection
