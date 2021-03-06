<!-- Sidebar -->
<nav id="sidebar">
    <!-- Sidebar Scroll Container -->
    <div id="sidebar-scroll">
        <!-- Sidebar Content -->
        <div class="sidebar-content">
            <!-- Side Header -->
            <div class="content-header content-header-fullrow px-15">
                <!-- Mini Mode -->
                <div class="content-header-section sidebar-mini-visible-b">
                    <!-- Logo -->
                    <span class="content-header-item font-w700 font-size-xl float-left animated fadeIn">
                        <span class="text-dual-primary-dark">c</span><span class="text-primary">b</span>
                    </span>
                    <!-- END Logo -->
                </div>
                <!-- END Mini Mode -->

                <!-- Normal Mode -->
                <div class="content-header-section text-center align-parent sidebar-mini-hidden">
                    <!-- Close Sidebar, Visible only on mobile screens -->
                    <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
                    <button type="button" class="btn btn-circle btn-dual-secondary d-lg-none align-v-r" data-toggle="layout" data-action="sidebar_close">
                        <i class="fa fa-times text-danger"></i>
                    </button>
                    <!-- END Close Sidebar -->

                    <!-- Logo -->
                    <div class="content-header-item">
                        <a class="link-effect font-w700" href="/admin">
                            <span class="font-size-xl text-dual-primary-dark">Mehta</span> <span class="font-size-xl text-primary">Plywood</span>
                        </a>
                    </div>
                    <!-- END Logo -->
                </div>
                <!-- END Normal Mode -->
            </div>
            <!-- END Side Header -->

            <!-- Side Navigation -->
            <div class="content-side content-side-full">
                <ul class="nav-main">
                    <li class="nav-main-heading"><span class="sidebar-mini-visible">PG</span><span class="sidebar-mini-hidden">Sections</span></li>
                    <li>
                        <a href="{{ route('admin.dashboard') }}"><i class="si si-screen-desktop"></i><span class="sidebar-mini-hide">Dashboard</span></a>
                    </li>
                    <li>
                        <a href="{{ route('admin.categories.index') }}"><i class="si si-list"></i><span class="sidebar-mini-hide">Category</span></a>
                    </li>
                    <li>
                        <a href="{{ route('products.index') }}"><i class="si si-handbag"></i><span class="sidebar-mini-hide">Products</span></a>
                    </li>
                    <li>
                        <a href="{{ route('admin.galleries.index') }}"><i class="si si-layers"></i><span class="sidebar-mini-hide">Galleries</span></a>
                    </li>
                    <li class="nav-main-heading"><span class="sidebar-mini-visible">OT</span><span class="sidebar-mini-hidden">Other</span></li>
                    <li>
                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form-header').submit();"><i class="si si-lock"></i><span class="sidebar-mini-hide">Sign out</span></a>
                        <form id="logout-form-header" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>
            </div>
            <!-- END Side Navigation -->
        </div>
        <!-- Sidebar Content -->
    </div>
    <!-- END Sidebar Scroll Container -->
</nav>
<!-- END Sidebar -->