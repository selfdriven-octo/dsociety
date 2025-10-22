
$(function()
{
  
	if (window.location.protocol == 'http:')
	{
		window.location.href = window.location.href.replace('http', 'https')
	}
	else
	{	
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 800, 'swing').promise().done(function () {

                window.location.hash = target;
            });
        });

        window.app =
        {
            controller: entityos._util.controller.code,
            vq: entityos._util.view.queue,
            get: entityos._util.data.get,
            set: entityos._util.data.set,
            invoke: entityos._util.controller.invoke,
            add: entityos._util.controller.add,
            show: entityos._util.view.queue.show
        };

        entityos._util.controller.invoke('app-least-harmful-projects-init');
    }
});

entityos._util.controller.add(
{
    name: 'app-least-harmful-projects-init',
    code: function ()
    {
        $.ajax(
        {
            type: 'GET',
            url: '/site/2152/dsociety-least-harmful-projects.json',
            cors: false,
            dataType: 'json',
            success: function(data)
            {
                var projectsView = app.vq.init({queue: 'projects-view'});
                var leastHarmfulData = data['dsociety-least-harmful'];

                if (leastHarmfulData != undefined)
                {
                    var projects = leastHarmfulData.projects;
                    projects = _.sortBy(projects, function (project) {return numeral(project.layer).format('00000') + project.title});

                    projectsView.add('<div class="row">');

                    _.each(projects, function (project)
                    {
                        projectsView.add(
                        [
                            '<div class="col-12 col-md-4 py-4">',
                                '<div class="p-4 h-100 lift text-center border rounded shadow-lg">',
                                    '<div class="lead fw-bold" style="color: #e8d5cf;">',
                                        '<a class="" href="', project.url, '" target="_blank" style="color:#ff943d;">', project.title, '</a>',
                                    '</div>',
                                     '<div class="text-dark mt-2 mb-2 px-4">',
                                        project.description,
                                    '</div>',
                                '</div>',
                            '</div>'
                        ]);
                    });

                    projectsView.add('</div>');

                    projectsView.render('#projects');
                }
            },
            error: function (data) {}			
        });
    }
});